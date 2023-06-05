import { BookingsService } from './bookings.service';
import { CreateBookingDto, GetListBookingDto, IdParamsDto, UpdateStatusBooking } from './dto/booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    getUsers(query: GetListBookingDto): Promise<import("../../interfaces").IPaginationRes<import("../../database/entities/bookings.model").Booking>>;
    getList(payload: CreateBookingDto): Promise<import("../../database/entities/bookings.model").Booking>;
    createUser(payload: CreateBookingDto): Promise<import("../../database/entities/bookings.model").Booking>;
    updateUser(param: IdParamsDto, payload: UpdateStatusBooking): Promise<import("../../database/entities/bookings.model").Booking>;
}
