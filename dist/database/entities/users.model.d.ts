import { Model } from 'sequelize-typescript';
import { EUserType } from 'src/enums';
import { Car } from './cars.model';
export declare class User extends Model {
    firstName: string;
    lastName: string;
    dob: Date;
    email: string;
    password: string;
    gender: string;
    phoneNumber: string;
    phoneCountryCode: string;
    nationality: string;
    userType: EUserType;
    status: string;
    deletedAt: string;
    car: Car[];
}
