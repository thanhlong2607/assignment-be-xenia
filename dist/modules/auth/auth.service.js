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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_services_1 = require("../users/users.services");
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
const helpers_2 = require("../../helpers");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async login(payload) {
        const { password, email } = payload;
        const user = await this.usersService.findOne(email);
        if (!user) {
            helpers_1.ErrorHelper.BadRequestException(constants_1.USER.USER_NOT_FOUND);
        }
        else if (!helpers_2.EncryptHelper.compare(password, user.password)) {
            helpers_1.ErrorHelper.BadRequestException(constants_1.USER.EMAIL_PASSWORD_INCORRECT);
        }
        const token = this.generateToken(user.id);
        return Object.assign(Object.assign({}, token), { user });
    }
    async verifyUser(id) {
        const user = await this.usersService.findOne({ id, deleted_at: null });
        return user;
    }
    generateToken(id) {
        const payload = {
            id,
        };
        const { token: accessToken, expires } = helpers_1.TokenHelper.generate(payload, constants_1.ACCESS_TOKEN_SECRET_KEY, constants_1.ACCESS_TOKEN_EXPIRE_TIME);
        const refreshToken = this.generateRefreshToken(id);
        return {
            accessToken,
            expires,
            refreshToken,
        };
    }
    generateRefreshToken(id) {
        return `refresh-token-${id}`;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_services_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map