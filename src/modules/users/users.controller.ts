import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { USER } from '../../constants';
import { ErrorHelper } from '../../helpers';

import {
  CreateUserDto,
  GetListUserDto,
  IdParamsDto,
  UpdateUserDto,
} from './dto';
import { UsersService } from './users.services';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserGuard } from 'src/common/guards/user.guard';
import { EUserType } from 'src/enums';

@Controller('users')
@UseGuards(UserGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @Auth([EUserType.EMPLOYEE])
  async getUsers(@Query() query: GetListUserDto) {
    return this.usersService.getUsers(query);
  }

  @Post()
  @HttpCode(201)
  @Auth([EUserType.EMPLOYEE])
  async createUser(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }

  @Get('/:id')
  @HttpCode(200)
  @Auth([EUserType.EMPLOYEE])
  async getUser(@Param() param: IdParamsDto) {
    const id = +param.id;

    const user = await this.usersService.findOne({
      where: { id, deletedAt: null },
    });

    if (!user) {
      ErrorHelper.BadRequestException(USER.USER_NOT_FOUND);
    }

    return user;
  }

  @Put('/:id')
  @HttpCode(200)
  @Auth([EUserType.EMPLOYEE])
  async updateUser(
    @Param() param: IdParamsDto,
    @Body() payload: UpdateUserDto,
  ) {
    const id = +param.id;
    return this.usersService.updateUser(id, payload);
  }

  @Delete('/:id')
  @HttpCode(200)
  @Auth([EUserType.EMPLOYEE])
  async deleteUser(@Param() param: IdParamsDto) {
    const id = +param.id;

    return await this.usersService.deleteUser(id);
  }
}
