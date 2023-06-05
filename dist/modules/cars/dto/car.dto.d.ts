export declare class GetListCarDto {
    page?: number;
    limit?: number;
    carNumber?: string;
}
export declare class CreateCarDto {
    name: string;
    brand: string;
    build: string;
    year: number;
    mode: string;
    isFeature: boolean;
    price: number;
    address: string;
    userId: number;
    carNumber: string;
    status: string;
}
export declare class UpdateCarDto extends CreateCarDto {
}
export declare class IdParamsDto {
    id: number;
}
