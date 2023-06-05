"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_EMAIL_NAME = exports.ADMIN_PASSWORD_EMAIL = exports.ADMIN_EMAIL = exports.PREFIX_KEY = exports.REDIS_DB = exports.REDIS_PASSWORD = exports.REDIS_PORT = exports.REDIS_HOST = exports.MYSQL_DATABASE = exports.MYSQL_PASSWORD = exports.MYSQL_USERNAME = exports.MYSQL_PORT = exports.MYSQL_HOST = exports.POSTGRES_DATABASE = exports.POSTGRES_PASSWORD = exports.POSTGRES_USERNAME = exports.POSTGRES_PORT = exports.POSTGRES_HOST = exports.S3_REGION = exports.AWS_BUCKET = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_ACCESS_KEY_ID = exports.OTP_TIME_EXPIRE = exports.SECRET_KEY_SEND_GMAIL = exports.BASE_URL = exports.SERVER_PORT = exports.ACCESS_TOKEN_SECRET_KEY = exports.ACCESS_TOKEN_EXPIRE_TIME = exports.SECRET_CRONJOB = exports.URL_PREFIX = exports.ENVIRONMENT = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.ENVIRONMENT = process.env.ENVIRONMENT || 'local';
exports.URL_PREFIX = process.env.URL_PREFIX || '/api';
exports.SECRET_CRONJOB = process.env.SECRET_CRONJOB || '27dfa083-4675-4aae-88f5-194054da69f6';
exports.ACCESS_TOKEN_EXPIRE_TIME = process.env.ACCESS_TOKEN_EXPIRE_TIME || '30d';
exports.ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || '5239955f-4e01-4873-aca9-5183816ae4a9 ';
exports.SERVER_PORT = +process.env.SERVER_PORT || 3000;
exports.BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
exports.SECRET_KEY_SEND_GMAIL = process.env.SECRET_KEY_SEND_GMAIL || '57ec1978-ddad-48b6-8db7-88123a8da5c2';
exports.OTP_TIME_EXPIRE = +process.env.OTP_TIME_EXPIRE || 300;
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'AWS_ACCESS_KEY_ID';
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'AWS_SECRET_ACCESS_KEY';
exports.AWS_BUCKET = process.env.AWS_BUCKET || 'AWS_BUCKET';
exports.S3_REGION = process.env.S3_REGION || 'S3_REGION';
exports.POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
exports.POSTGRES_PORT = +process.env.POSTGRES_PORT || 5432;
exports.POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || 'postgres';
exports.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password';
exports.POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || 'base';
exports.MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
exports.MYSQL_PORT = +process.env.MYSQL_PORT || 3306;
exports.MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'mysql';
exports.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'password';
exports.MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'base';
exports.REDIS_HOST = process.env.REDIS_HOST || 'localhost';
exports.REDIS_PORT = +process.env.REDIS_PORT || 6379;
exports.REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';
exports.REDIS_DB = +process.env.REDIS_DB || 0;
exports.PREFIX_KEY = process.env.PREFIX_KEY || '';
exports.ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'example@adamosoft.com';
exports.ADMIN_PASSWORD_EMAIL = process.env.ADMIN_PASSWORD_EMAIL || 'abc+=123';
exports.ADMIN_EMAIL_NAME = process.env.ADMIN_EMAIL_NAME || 'abc+=123';
//# sourceMappingURL=config-env.js.map