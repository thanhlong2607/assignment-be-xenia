import { Model } from 'sequelize-typescript';
import { Car } from './cars.model';
export declare class CarAvailability extends Model {
    endAt: Date;
    startAt: Date;
    carId: number;
    car: Car;
}
