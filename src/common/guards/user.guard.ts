import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_TOKEN_SECRET_KEY, SPEC_KEY } from 'src/constants';

import { ErrorHelper, TokenHelper } from '../../helpers';
import { IAuthPermission } from 'src/interfaces';
import { AuthService } from 'src/modules/auth/auth.service';
import { IGenerateJWT } from 'src/interfaces/auth.interfaces';
import { EUserType } from 'src/enums';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const specs = this.reflector.getAllAndOverride<IAuthPermission>(SPEC_KEY, [
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

  private checkPermission(spec: EUserType[], role: EUserType) {
    return spec.includes(role);
  }

  async verifyAccessToken(authorization: string) {
    const [bearer, accessToken] = authorization.split(' ');
    if (bearer === 'Bearer' && accessToken !== '') {
      const payload = TokenHelper.verify<IGenerateJWT>(
        accessToken,
        ACCESS_TOKEN_SECRET_KEY,
      );
      const user = await this.authService.verifyUser(payload.id);
      return user;
    } else {
      ErrorHelper.UnauthorizedException('Unauthorized');
    }
  }
}
