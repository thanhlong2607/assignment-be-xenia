import { BaseRepository } from 'src/database/base.repository';
import { CarAvailability } from 'src/database/entities/car_availability.model';
export declare class CarAvailabilitiesRepository extends BaseRepository<CarAvailability> {
    readonly model: typeof CarAvailability;
    constructor(model: typeof CarAvailability);
}
