import { Model } from 'sequelize-typescript';
import { User } from './users.model';
import { CarAvailability } from './car_availability.model';
export declare class Car extends Model {
    name: string;
    brand: string;
    build: string;
    year: number;
    mode: string;
    carNumber: string;
    isFeature: boolean;
    price: number;
    address: string;
    status: string;
    deletedAt: string;
    userId: number;
    user: User;
    carAvailabilities: CarAvailability[];
}
