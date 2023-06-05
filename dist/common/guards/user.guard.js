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
exports.UserGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
const auth_service_1 = require("../../modules/auth/auth.service");
let UserGuard = class UserGuard {
    constructor(reflector, authService) {
        this.reflector = reflector;
        this.authService = authService;
    }
    async canActivate(context) {
        const specs = this.reflector.getAllAndOverride(constants_1.SPEC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const req = context.switchToHttp().getRequest();
        const authorization = req.headers.authorization || String(req.cookies.JWT);
        const userInfo = await this.verifyAccessToken(authorization);
        req.user = userInfo;
        const { specs: spec, permission } = specs;
        if (!spec) {
            return true;
        }
        const { userType } = userInfo;
        if (permission) {
            return spec.includes[userType];
        }
        return this.checkPermission(spec, userType);
    }
    checkPermission(spec, role) {
        return spec.includes(role);
    }
    async verifyAccessToken(authorization) {
        const [bearer, accessToken] = authorization.split(' ');
        if (bearer === 'Bearer' && accessToken !== '') {
            const payload = helpers_1.TokenHelper.verify(accessToken, constants_1.ACCESS_TOKEN_SECRET_KEY);
            const user = await this.authService.verifyUser(payload.id);
            return user;
        }
        else {
            helpers_1.ErrorHelper.UnauthorizedException('Unauthorized');
        }
    }
};
UserGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService])
], UserGuard);
exports.UserGuard = UserGuard;
//# sourceMappingURL=user.guard.js.map