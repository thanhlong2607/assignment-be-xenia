import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';

import { Car } from '../../database/entities/cars.model';

@Injectable()
export class CarsRepository extends BaseRepository<Car> {
  constructor(@InjectModel(Car) readonly model: typeof Car) {
    super(model);
  }
}
