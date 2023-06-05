import { CarsService } from './cars.service';
import { CreateCarDto, GetListCarDto, IdParamsDto, UpdateCarDto } from './dto/car.dto';
export declare class CarsController {
    private readonly carsService;
    constructor(carsService: CarsService);
    getUsers(query: GetListCarDto): Promise<import("../../interfaces").IPaginationRes<import("../../database/entities/cars.model").Car>>;
    createUser(payload: CreateCarDto): Promise<import("../../database/entities/cars.model").Car>;
    getCar(param: IdParamsDto): Promise<import("../../database/entities/cars.model").Car>;
    updateUser(param: IdParamsDto, payload: UpdateCarDto): Promise<import("../../database/entities/cars.model").Car>;
    deleteUser(param: IdParamsDto): Promise<import("../../database/entities/cars.model").Car>;
}
