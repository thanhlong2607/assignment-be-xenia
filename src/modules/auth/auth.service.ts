import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.services';
import { IToken } from 'src/interfaces';
import {
  ACCESS_TOKEN_EXPIRE_TIME,
  ACCESS_TOKEN_SECRET_KEY,
  USER,
} from 'src/constants';
import { ErrorHelper, TokenHelper } from 'src/helpers';
import { LoginDto } from '../dto/login.dto';
import { EncryptHelper } from 'src/helpers';
import { User } from '../../database/entities/index.model';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(payload: LoginDto) {
    const { password, email } = payload;

    const user = await this.usersService.findOne(email);

    if (!user) {
      ErrorHelper.BadRequestException(USER.USER_NOT_FOUND);
    } else if (!EncryptHelper.compare(password, user.password)) {
      ErrorHelper.BadRequestException(USER.EMAIL_PASSWORD_INCORRECT);
    }

    const token = this.generateToken(user.id);

    return {
      ...token,
      user,
    };
  }

  async verifyUser(id: number): Promise<User> {
    const user = await this.usersService.findOne({ id, deleted_at: null });
    return user;
  }

  private generateToken(id: number): IToken {
    const payload = {
      id,
    };
    const { token: accessToken, expires } = TokenHelper.generate(
      payload,
      ACCESS_TOKEN_SECRET_KEY,
      ACCESS_TOKEN_EXPIRE_TIME,
    );
    const refreshToken = this.generateRefreshToken(id);

    return {
      accessToken,
      expires,
      refreshToken,
    };
  }

  private generateRefreshToken(id: number): string {
    return `refresh-token-${id}`;
  }
}
