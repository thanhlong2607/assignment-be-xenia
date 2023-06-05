import { BaseRepository } from 'src/database/base.repository';
import { User } from '../../database/entities/users.model';
export declare class UsersRepository extends BaseRepository<User> {
    readonly model: typeof User;
    constructor(model: typeof User);
}
