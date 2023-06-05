import { Redis } from '@nestjs-modules/ioredis';
export declare class RedisService {
    private readonly redis;
    constructor(redis: Redis);
    setExpire(key: string, data: any): Promise<"OK">;
    get(key: string): Promise<string>;
    hset(key: string, fields: string, value: string | number): Promise<number>;
    hget(key: string, fields: string): Promise<string>;
    hgetall(key: string): Promise<Record<string, string>>;
    expire(key: string, expireTime: number): Promise<number>;
    delete(key: string): Promise<number>;
    ttl(key: string): Promise<number>;
    incr(key: string): Promise<number>;
    del(key: string): Promise<number>;
}
