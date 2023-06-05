import { UsersService } from '../users/users.services';
import { LoginDto } from '../dto/login.dto';
import { User } from '../../database/entities/index.model';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    login(payload: LoginDto): Promise<{
        user: User;
        accessToken: string;
        expires: number;
        refreshToken: string;
    }>;
    verifyUser(id: number): Promise<User>;
    private generateToken;
    private generateRefreshToken;
}
