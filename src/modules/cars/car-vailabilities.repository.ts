import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { Booking } from 'src/database/entities/bookings.model';
import { CarAvailability } from 'src/database/entities/car_availability.model';


@Injectable()
export class CarAvailabilitiesRepository extends BaseRepository<CarAvailability> {
  constructor(@InjectModel(CarAvailability) readonly model: typeof CarAvailability) {
    super(model);
  }
}
