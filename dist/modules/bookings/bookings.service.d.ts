import { BookingsRepository } from './bookings.repository';
import { Attributes } from 'sequelize';
import { Booking } from 'src/database/entities/bookings.model';
import { UsersService } from '../users/users.services';
import { CarsService } from '../cars/cars.service';
import { GetListBookingDto } from './dto/booking.dto';
export declare class BookingsService {
    private bookingsRepository;
    private usersService;
    private carsService;
    constructor(bookingsRepository: BookingsRepository, usersService: UsersService, carsService: CarsService);
    findOne(data: Attributes<Booking>): Promise<Booking>;
    findById(id: number): Promise<Booking>;
    getBookings(query: GetListBookingDto): Promise<import("../../interfaces").IPaginationRes<Booking>>;
    createBooking(data: Attributes<Booking>): Promise<Booking>;
    updateStatusBooking(id: number, data: Attributes<Booking>): Promise<Booking>;
}
