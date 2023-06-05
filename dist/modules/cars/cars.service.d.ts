import { CarsRepository } from './cars.repository';
import { UsersService } from '../users/users.services';
import { GetListCarDto } from './dto/car.dto';
import { Attributes } from 'sequelize';
import { Car } from 'src/database/entities/cars.model';
import { CarAvailabilitiesRepository } from './car-vailabilities.repository';
export declare class CarsService {
    private carsRepository;
    private carAvailabilitiesRepository;
    private usersService;
    constructor(carsRepository: CarsRepository, carAvailabilitiesRepository: CarAvailabilitiesRepository, usersService: UsersService);
    findOne(data: Attributes<Car>): Promise<Car>;
    findById(id: number): Promise<Car>;
    getCars(query: GetListCarDto): Promise<import("../../interfaces").IPaginationRes<Car>>;
    createCar(data: Attributes<Car>): Promise<Car>;
    updateCar(id: number, data: Attributes<Car>): Promise<Car>;
    deleteCar(id: number): Promise<Car>;
    checkTimeConflict(carId: number, requestStartAt: Date, requestEndAt: Date): Promise<boolean>;
    addAvailability(carId: number, requestStartAt: Date, requestEndAt: Date): Promise<void>;
    checkPayloadCar(data: Attributes<Car>, id?: number): Promise<void>;
}
