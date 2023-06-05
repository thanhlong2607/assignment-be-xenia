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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const moment_1 = __importDefault(require("moment"));
const helpers_1 = require("../../helpers");
const users_repository_1 = require("./users.repository");
const sequelize_1 = require("sequelize");
const _ = __importStar(require("lodash"));
const enums_1 = require("../../enums");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findOne(data) {
        return this.usersRepository.findOne(data);
    }
    async findById(id) {
        return this.usersRepository.findById(id);
    }
    getUsers(query) {
        const { page, limit, dob, gender, status, email } = query;
        let filters = {
            dob,
            gender,
            status,
            userType: enums_1.EUserType.CUSTOMER,
            deletedAt: null
        };
        if (email === null || email === void 0 ? void 0 : email.trim()) {
            filters = Object.assign(Object.assign({}, filters), { email: {
                    [sequelize_1.Op.substring]: email,
                } });
        }
        const getAllCondition = _.pickBy(filters, _.identity);
        return this.usersRepository.paginate(getAllCondition, page, limit);
    }
    async createUser(data) {
        await this.checkPayloadUser(data);
        const payload = Object.assign(Object.assign({}, data), { status: 'active', userType: enums_1.EUserType.CUSTOMER, password: await helpers_1.EncryptHelper.hash(data.password) });
        return this.usersRepository.create(payload);
    }
    async updateUser(id, data) {
        await this.checkPayloadUser(data, id);
        const payload = Object.assign(Object.assign({}, data), { password: await helpers_1.EncryptHelper.hash(data.password) });
        const updateByIdConditions = { id };
        const affectedRows = await this.usersRepository.update(payload, updateByIdConditions);
        return affectedRows[0];
    }
    async deleteUser(id) {
        const removeByIdConditions = { id };
        const user = await this.usersRepository.findOne({
            where: { id, deletedAt: null },
        });
        if (!user) {
            helpers_1.ErrorHelper.BadRequestException(constants_1.USER.USER_NOT_FOUND);
        }
        const affectedRows = await this.usersRepository.update({ deletedAt: (0, moment_1.default)().format().toString() }, removeByIdConditions);
        return affectedRows[0];
    }
    generateRefreshToken(id) {
        return `refresh-token-${id}`;
    }
    async checkPayloadUser(data, id) {
        const { email, phoneNumber, phoneCountryCode, dob } = data;
        let condition = {
            [sequelize_1.Op.or]: [
                { email: email },
                {
                    phoneNumber: phoneNumber,
                    phoneCountryCode: phoneCountryCode,
                },
            ],
            deletedAt: null,
        };
        if (id) {
            const user = await this.findById(id);
            if (!user) {
                helpers_1.ErrorHelper.BadRequestException(constants_1.USER.USER_NOT_FOUND);
            }
            condition = Object.assign(Object.assign({}, condition), { id: {
                    [sequelize_1.Op.ne]: id,
                } });
        }
        const checkExistUser = await this.usersRepository.findOne({
            where: condition,
        });
        if (checkExistUser) {
            helpers_1.ErrorHelper.BadRequestException(constants_1.USER.USER_IS_EXITS);
        }
        if ((0, moment_1.default)(dob).isAfter((0, moment_1.default)())) {
            helpers_1.ErrorHelper.BadRequestException(constants_1.USER.DOB_IS_BEFORE_NOW);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.services.js.map