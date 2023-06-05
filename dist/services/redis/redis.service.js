"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const helpers_1 = require("../../helpers");
let RedisService = class RedisService {
    constructor(redis) {
        this.redis = redis;
    }
    async setExpire(key, data) {
        const expireTime = helpers_1.CommonHelper.random(1, 600);
        return this.redis.set(key, data, 'EX', expireTime);
    }
    async get(key) {
        return this.redis.get(key);
    }
    async hset(key, fields, value) {
        return this.redis.hset(key, fields, value);
    }
    async hget(key, fields) {
        return this.redis.hget(key, fields);
    }
    async hgetall(key) {
        return this.redis.hgetall(key);
    }
    async expire(key, expireTime) {
        return this.redis.expire(key, expireTime);
    }
    async delete(key) {
        return this.redis.del(key);
    }
    async ttl(key) {
        return this.redis.ttl(key);
    }
    async incr(key) {
        return this.redis.incr(key);
    }
    async del(key) {
        return this.redis.del(key);
    }
};
RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [Object])
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map