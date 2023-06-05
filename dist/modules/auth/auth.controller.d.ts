import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(payload: LoginDto): Promise<{
        user: import("../../database/entities/users.model").User;
        accessToken: string;
        expires: number;
        refreshToken: string;
    }>;
}
