import { BaseRepository } from 'src/database/base.repository';
import { Booking } from 'src/database/entities/bookings.model';
export declare class BookingsRepository extends BaseRepository<Booking> {
    readonly model: typeof Booking;
    constructor(model: typeof Booking);
}
