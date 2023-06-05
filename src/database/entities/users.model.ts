import { Exclude } from 'class-transformer';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { EUserType } from 'src/enums';
import { Car } from './cars.model';

@Table({
  tableName: 'users',
  underscored: true,
})
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  dob: Date;

  @Column
  email: string;

  @Column
  @Exclude()
  password: string;

  @Column
  gender: string;

  @Column
  phoneNumber: string;

  @Column
  phoneCountryCode: string;

  @Column
  nationality: string;

  @Column({ type: 'enum' })
  userType: EUserType;

  @Column
  status: string;

  @Column
  deletedAt: string;

  @HasMany(() => Car)
  car: Car[];
}
