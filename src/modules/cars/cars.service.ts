import { Injectable } from '@nestjs/common';
import { CarsRepository } from './cars.repository';
import { UsersService } from '../users/users.services';
import { CreateCarDto, GetListCarDto } from './dto/car.dto';
import { Attributes, WhereOptions } from 'sequelize';
import { Car } from 'src/database/entities/cars.model';
import { Op } from 'sequelize';
import { ErrorHelper } from 'src/helpers';
import { CAR } from 'src/constants';
import moment from 'moment';
import { CarAvailabilitiesRepository } from './car-vailabilities.repository';
import { User } from 'src/database/entities/users.model';
@Injectable()
export class CarsService {
  constructor(
    private carsRepository: CarsRepository,
    private carAvailabilitiesRepository: CarAvailabilitiesRepository,
    private usersService: UsersService,
  ) {}

  async findOne(data: Attributes<Car>): Promise<Car> {
    return this.carsRepository.findOne(data);
  }

  async findById(id: number): Promise<Car> {
    return this.carsRepository.findById(id);
  }

  async getCars(query: GetListCarDto) {
    const { page, limit, carNumber } = query;
    let filters: any = {};
    if (carNumber?.trim()) {
      filters = {
        carNumber: {
          [Op.substring]: carNumber,
        },
      };
    }

    const opt = {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    };

    return this.carsRepository.paginate(filters, page, limit, opt);
  }

  async createCar(data: Attributes<Car>) {
    await this.checkPayloadCar(data);
    let payload = { ...data, status: 'active' };
    return this.carsRepository.create(payload);
  }

  async updateCar(id: number, data: Attributes<Car>): Promise<Car> {
    await this.checkPayloadCar(data, id);

    const updateByIdConditions: WhereOptions<Car> = { id };
    const affectedRows = await this.carsRepository.update(
      data,
      updateByIdConditions,
    );

    return affectedRows[0];
  }

  async deleteCar(id: number): Promise<Car> {
    const removeByIdConditions: WhereOptions<Car> = { id };

    const user = await this.carsRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!user) {
      ErrorHelper.BadRequestException(CAR.CAR_NOT_FOUND);
    }

    const affectedRows = await this.carsRepository.update(
      { deletedAt: moment().format().toString() },
      removeByIdConditions,
    );

    return affectedRows[0];
  }

  async checkTimeConflict(
    carId: number,
    requestStartAt: Date,
    requestEndAt: Date,
  ): Promise<boolean> {
    const reservation = await this.carAvailabilitiesRepository.findOne({
      where: {
        carId,
        startAt: { $lt: requestEndAt },
        endAt: { $gt: requestStartAt },
      },
    });

    const hasConflict = !!reservation;

    return hasConflict;
  }

  async addAvailability(
    carId: number,
    requestStartAt: Date,
    requestEndAt: Date,
  ) {
    await this.carAvailabilitiesRepository.create({
      carId,
      startAt: requestStartAt,
      endAt: requestEndAt,
    });
  }

  async checkPayloadCar(data: Attributes<Car>, id?: number): Promise<void> {
    const { carNumber } = data;

    let condition: any = {
      carNumber,
      deletedAt: null,
    };

    if (id) {
      const user = await this.findById(id);
      if (!user) {
        ErrorHelper.BadRequestException(CAR.CAR_NOT_FOUND);
      }

      condition = {
        ...condition,
        id: {
          [Op.ne]: id,
        },
      };
    }

    const checkExistUser = await this.carsRepository.findOne({
      where: condition,
    });

    if (checkExistUser) {
      ErrorHelper.BadRequestException(CAR.CAR_IS_EXITS);
    }
  }
}
