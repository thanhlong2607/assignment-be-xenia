import { BaseRepository } from 'src/database/base.repository';
import { Car } from '../../database/entities/cars.model';
export declare class CarsRepository extends BaseRepository<Car> {
    readonly model: typeof Car;
    constructor(model: typeof Car);
}
