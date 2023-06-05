"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresqlModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const constants_1 = require("../constants");
let PostgresqlModule = class PostgresqlModule {
};
PostgresqlModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: () => ({
                    dialect: 'postgres',
                    host: constants_1.POSTGRES_HOST,
                    port: constants_1.POSTGRES_PORT,
                    username: constants_1.POSTGRES_USERNAME,
                    password: constants_1.POSTGRES_PASSWORD,
                    database: constants_1.POSTGRES_DATABASE,
                    autoLoadModels: true,
                    logging: false,
                    dialectOptions: constants_1.ENVIRONMENT != 'local'
                        ? {
                            ssl: {
                                require: true,
                                rejectUnauthorized: false,
                            },
                        }
                        : {},
                }),
            }),
        ],
    })
], PostgresqlModule);
exports.PostgresqlModule = PostgresqlModule;
//# sourceMappingURL=postgresql.module.js.map