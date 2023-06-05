import { CreateUserDto, GetListUserDto, IdParamsDto, UpdateUserDto } from './dto';
import { UsersService } from './users.services';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(query: GetListUserDto): Promise<import("../../interfaces").IPaginationRes<import("../../database/entities/users.model").User>>;
    createUser(payload: CreateUserDto): Promise<import("../../database/entities/users.model").User>;
    getUser(param: IdParamsDto): Promise<import("../../database/entities/users.model").User>;
    updateUser(param: IdParamsDto, payload: UpdateUserDto): Promise<import("../../database/entities/users.model").User>;
    deleteUser(param: IdParamsDto): Promise<import("../../database/entities/users.model").User>;
}
