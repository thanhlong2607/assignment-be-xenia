export declare class GetListUserDto {
    page?: number;
    limit?: number;
    dob?: string;
    gender?: string;
    status?: string;
    fullname?: string;
    email?: string;
    phone?: string;
}
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    phoneNumber: string;
    phoneCountryCode: string;
    nationality: string;
}
export declare class UpdateUserDto extends CreateUserDto {
}
export declare class UpdateStatusDto {
    status: boolean;
}
export declare class IdParamsDto {
    id: number;
}
