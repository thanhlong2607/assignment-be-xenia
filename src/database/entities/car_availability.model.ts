import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Car } from './cars.model';

@Table({
  tableName: 'car_availabilities',
  underscored: true,
})
export class CarAvailability extends Model {
  @Column
  endAt: Date;

  @Column
  startAt: Date;

  @ForeignKey(() => Car)
  @Column
  carId: number;

  @BelongsTo(() => Car)
  car: Car;
}
