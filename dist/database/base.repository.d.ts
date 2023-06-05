import { Attributes, FindAndCountOptions, FindOptions, WhereOptions } from 'sequelize';
import { Model, Repository } from 'sequelize-typescript';
import { IPaginationRes } from '../interfaces';
export declare class BaseRepository<T extends Model> {
    readonly model: Repository<T>;
    constructor(model: Repository<T>);
    find(options?: FindOptions<T>): Promise<T[]>;
    findOne(options?: FindOptions<T>): Promise<T>;
    findById(id: number, options?: FindOptions<T>): Promise<T>;
    paginate(options?: WhereOptions<T>, page?: number, limit?: number, opts?: FindOptions<T>): Promise<IPaginationRes<T>>;
    rawPaginate(options: FindAndCountOptions): Promise<{
        rows: T[];
        count: number;
    }>;
    create(entity: Attributes<T>): Promise<T>;
    update(entity: Attributes<T>, conditions: WhereOptions<T>): Promise<T[]>;
    delete(conditions: WhereOptions<T>): Promise<number>;
    raw(query: string): Promise<[unknown[], unknown]>;
    getModel(): Repository<T>;
}
