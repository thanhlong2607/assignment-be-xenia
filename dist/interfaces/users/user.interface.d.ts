import { EUserType } from '../../enums';
export interface IUser {
    id: number;
    phone: string;
    name: string;
    email: string;
    userType: EUserType;
}
export interface IAuthPermission {
    specs: EUserType[];
    permission?: boolean;
}
