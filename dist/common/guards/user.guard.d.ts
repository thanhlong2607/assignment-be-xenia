import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/modules/auth/auth.service';
export declare class UserGuard implements CanActivate {
    private readonly reflector;
    private readonly authService;
    constructor(reflector: Reflector, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<any>;
    private checkPermission;
    verifyAccessToken(authorization: string): Promise<import("../../database/entities/users.model").User>;
}
