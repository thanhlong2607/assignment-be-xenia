import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Car } from './cars.model';
import { User } from './users.model';

@Table({
  tableName: 'bookings',
  underscored: true,
})
export class Booking extends Model {
  @Column
  requestStartAt: Date;

  @Column
  requestEndAt: Date;

  @Column
  pricePerDay: number;

  @Column
  totalPrice: number;

  @Column
  status: string;

  @Column
  referenceNo: string;

  @ForeignKey(() => Car)
  @Column
  carId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => Car)
  car: Car;

  @BelongsTo(() => User)
  user: User;
}
