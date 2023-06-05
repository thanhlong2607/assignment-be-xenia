import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from 'src/database/entities/bookings.model';
import { BookingsRepository } from './bookings.repository';
import { CarsModule } from '../cars/cars.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Booking]), CarsModule, UsersModule],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository],
  exports: [BookingsService, BookingsRepository]
})
export class BookingsModule {}
