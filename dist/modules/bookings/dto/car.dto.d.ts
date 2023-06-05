export declare class CreateCarDto {
    name: string;
    brand: string;
    build: string;
    year: string;
    mode: string;
    isFeature: boolean;
    price: number;
    geolocation: string;
    userId: number;
    carNumber: string;
    status: string;
}
export declare class UpdateCarDto extends CreateCarDto {
}
export declare class IdParamsDto {
    id: number;
}
