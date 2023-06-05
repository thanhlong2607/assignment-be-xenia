import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { Booking } from 'src/database/entities/bookings.model';

@Injectable()
export class BookingsRepository extends BaseRepository<Booking> {
  constructor(@InjectModel(Booking) readonly model: typeof Booking) {
    super(model);
  }
}
