import { Exclude } from 'class-transformer';
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { EUserType } from 'src/enums';
import { User } from './users.model';
import { CarAvailability } from './car_availability.model';

@Table({
  tableName: 'cars',
  underscored: true,
})
export class Car extends Model {
  @Column
  name: string;

  @Column
  brand: string;

  @Column
  build: string;

  @Column
  year: number;

  @Column
  mode: string;

  @Column
  carNumber: string;

  @Column
  isFeature: boolean;

  @Column
  price: number;

  @Column
  address: string;

  @Column
  status: string;

  @Column
  deletedAt: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => CarAvailability)
  carAvailabilities: CarAvailability[];
}
