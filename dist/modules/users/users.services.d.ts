import { Attributes } from 'sequelize';
import { User } from 'src/database/entities/users.model';
import { IPaginationRes } from '../../interfaces';
import { UsersRepository } from './users.repository';
import { GetListUserDto } from './dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    findOne(data: Attributes<User>): Promise<User>;
    findById(id: number): Promise<User>;
    getUsers(query: GetListUserDto): Promise<IPaginationRes<User>>;
    createUser(data: Attributes<User>): Promise<User>;
    updateUser(id: number, data: Attributes<User>): Promise<User>;
    deleteUser(id: number): Promise<User>;
    private generateRefreshToken;
    checkPayloadUser(data: Attributes<User>, id?: number): Promise<void>;
}
