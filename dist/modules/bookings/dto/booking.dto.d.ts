export declare class GetListBookingDto {
    page?: number;
    limit?: number;
    userId?: number;
    carId?: number;
    status?: string;
    referenceNo?: string;
}
export declare class CreateBookingDto {
    requestStartAt: Date;
    requestEndAt: Date;
    carId: number;
    userId: number;
}
export declare class UpdateStatusBooking {
    status: string;
}
export declare class IdParamsDto {
    id: number;
}
