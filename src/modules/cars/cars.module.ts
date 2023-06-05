import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarsRepository } from './cars.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from 'src/database/entities/cars.model';
import { UsersModule } from '../users/users.module';
import { CarAvailabilitiesRepository } from './car-vailabilities.repository';
import { CarAvailability } from 'src/database/entities/car_availability.model';

@Module({
  imports: [SequelizeModule.forFeature([Car, CarAvailability]), UsersModule],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository, CarAvailabilitiesRepository],
  exports: [CarsService, CarsRepository, CarAvailabilitiesRepository]
})
export class CarsModule {}
