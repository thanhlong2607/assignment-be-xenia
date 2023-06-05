"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoRedisModule = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const redis_service_1 = require("./redis.service");
let IoRedisModule = class IoRedisModule {
};
IoRedisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ioredis_1.RedisModule.forRootAsync({
                useFactory: () => {
                    return {
                        config: {
                            host: constants_1.REDIS_HOST,
                            port: constants_1.REDIS_PORT,
                            password: constants_1.REDIS_PASSWORD,
                            db: constants_1.REDIS_DB,
                            keyPrefix: constants_1.PREFIX_KEY,
                        },
                    };
                },
            }),
        ],
        providers: [redis_service_1.RedisService],
        exports: [redis_service_1.RedisService],
    })
], IoRedisModule);
exports.IoRedisModule = IoRedisModule;
//# sourceMappingURL=redis.module.js.map