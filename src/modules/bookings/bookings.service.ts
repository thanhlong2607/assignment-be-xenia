import { Injectable } from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';
import { Attributes, WhereOptions } from 'sequelize';
import { Booking } from 'src/database/entities/bookings.model';
import { UsersService } from '../users/users.services';
import { CarsService } from '../cars/cars.service';
import moment from 'moment';
import { CommonHelper, ErrorHelper } from 'src/helpers';
import { CAR, USER } from 'src/constants';
import { BOOKING } from 'src/constants/messages/booking.message';
import * as _ from 'lodash';
import { GetListBookingDto } from './dto/booking.dto';
import { Op } from 'sequelize';
import { Car } from 'src/database/entities/cars.model';
import { User } from 'src/database/entities/users.model';

@Injectable()
export class BookingsService {
  constructor(
    private bookingsRepository: BookingsRepository,
    private usersService: UsersService,
    private carsService: CarsService,
  ) {}

  async findOne(data: Attributes<Booking>): Promise<Booking> {
    return this.bookingsRepository.findOne(data);
  }

  async findById(id: number): Promise<Booking> {
    return this.bookingsRepository.findById(id);
  }

  async getBookings(query: GetListBookingDto) {
    const { page, limit, userId, carId, status, referenceNo } = query;
    let filters: any = {
      userId,
      carId,
      status,
    };

    if (referenceNo?.trim()) {
      filters = {
        ...filters,
        referenceNo: {
          [Op.substring]: referenceNo,
        },
      };
    }

    const getAllCondition: any = _.pickBy(filters, _.identity);

    const opt = {
      include: [
        {
          model: Car,
        },
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    };

    return this.bookingsRepository.paginate(getAllCondition, page, limit, opt);
  }

  async createBooking(data: Attributes<Booking>) {
    const { requestStartAt, requestEndAt, carId, userId } = data;

    const car = await this.carsService.findOne({
      where: { id: carId },
    });

    const user = await this.usersService.findOne({
      where: { id: userId },
    });

    if (!user) {
      ErrorHelper.BadRequestException(USER.USER_NOT_FOUND);
    }

    if (!car) {
      ErrorHelper.BadRequestException(CAR.CAR_NOT_FOUND);
    }

    const requestStartAtFormat = moment(requestStartAt);
    const requestEndAtFormat = moment(requestEndAt);

    if (requestStartAtFormat.isAfter(requestEndAtFormat)) {
      ErrorHelper.BadRequestException(BOOKING.START_BEFORE_END);
    }

    const checkTimeConflict = await this.carsService.checkTimeConflict(
      carId,
      requestStartAtFormat.toDate(),
      requestEndAtFormat.toDate(),
    );
    if (checkTimeConflict) {
      ErrorHelper.BadRequestException(BOOKING.CAR_IS_BOOKED);
    }

    const carPrice = car.price;
    const duration = Math.ceil(
      requestEndAtFormat.diff(requestStartAtFormat, 'day', true),
    );
    const totalPrice = duration * carPrice;

    const payload = {
      requestStartAt,
      requestEndAt,
      carId,
      userId,
      pricePerDay: carPrice,
      totalPrice,
      status: 'pending',
      referenceNo: CommonHelper.generateRandomString(6),
    };

    await this.carsService.addAvailability(
      carId,
      requestStartAtFormat.toDate(),
      requestEndAtFormat.toDate(),
    );
    const booking = await this.bookingsRepository.create(payload);

    return booking;
  }

  async updateStatusBooking(id: number, data: Attributes<Booking>) {
    const { status, reason } = data;
    const booking = await this.bookingsRepository.findById(id);
    if (booking) {
      ErrorHelper.BadRequestException(BOOKING.BOOKING_NOT_FOUND);
    }

    const payload = { status };

    const updateByIdConditions: WhereOptions<Booking> = { id };
    const affectedRows = await this.bookingsRepository.update(
      payload,
      updateByIdConditions,
    );

    return affectedRows[0];
  }
}
