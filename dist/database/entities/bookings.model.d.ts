import { Model } from 'sequelize-typescript';
import { Car } from './cars.model';
import { User } from './users.model';
export declare class Booking extends Model {
    requestStartAt: Date;
    requestEndAt: Date;
    pricePerDay: number;
    totalPrice: number;
    status: string;
    referenceNo: string;
    carId: number;
    userId: number;
    car: Car;
    user: User;
}
