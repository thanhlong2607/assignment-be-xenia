import { Injectable } from '@nestjs/common';
import { Attributes, WhereOptions } from 'sequelize';
import { USER } from 'src/constants';
import { User } from 'src/database/entities/users.model';
import moment from 'moment';

import { EncryptHelper, ErrorHelper } from '../../helpers';
import { IPaginationRes } from '../../interfaces';
import { UsersRepository } from './users.repository';
import { Op } from 'sequelize';
import { GetListUserDto } from './dto';
import * as _ from 'lodash';
import { EUserType } from 'src/enums';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOne(data: Attributes<User>): Promise<User> {
    return this.usersRepository.findOne(data);
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findById(id);
  }

  getUsers(query: GetListUserDto): Promise<IPaginationRes<User>> {
    const { page, limit, dob, gender, status, email } = query;
    let filters: any = {
      dob,
      gender,
      status,
      userType: EUserType.CUSTOMER,
      deletedAt: null
    };

    if (email?.trim()) {
      filters = {
        ...filters,
        email: {
          [Op.substring]: email,
        },
      };
    }

    const getAllCondition = _.pickBy(filters, _.identity);

    return this.usersRepository.paginate(getAllCondition, page, limit);
  }

  async createUser(data: Attributes<User>): Promise<User> {
    await this.checkPayloadUser(data);

    const payload = {
      ...data,
      status: 'active',
      userType: EUserType.CUSTOMER,
      password: await EncryptHelper.hash(data.password),
    };

    return this.usersRepository.create(payload);
  }

  async updateUser(id: number, data: Attributes<User>): Promise<User> {
    await this.checkPayloadUser(data, id);

    const payload = {
      ...data,
      password: await EncryptHelper.hash(data.password),
    };

    const updateByIdConditions: WhereOptions<User> = { id };
    const affectedRows = await this.usersRepository.update(
      payload,
      updateByIdConditions,
    );

    return affectedRows[0];
  }

  async deleteUser(id: number): Promise<User> {
    const removeByIdConditions: WhereOptions<User> = { id };

    const user = await this.usersRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!user) {
      ErrorHelper.BadRequestException(USER.USER_NOT_FOUND);
    }

    const affectedRows = await this.usersRepository.update(
      { deletedAt: moment().format().toString() },
      removeByIdConditions,
    );

    return affectedRows[0];
  }

  private generateRefreshToken(id: number): string {
    return `refresh-token-${id}`;
  }

  async checkPayloadUser(data: Attributes<User>, id?: number): Promise<void> {
    const { email, phoneNumber, phoneCountryCode, dob } = data;

    let condition: any = {
      [Op.or]: [
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
        ErrorHelper.BadRequestException(USER.USER_NOT_FOUND);
      }

      condition = {
        ...condition,
        id: {
          [Op.ne]: id,
        },
      };
    }

    const checkExistUser = await this.usersRepository.findOne({
      where: condition,
    });

    if (checkExistUser) {
      ErrorHelper.BadRequestException(USER.USER_IS_EXITS);
    }

    if (moment(dob).isAfter(moment())) {
      ErrorHelper.BadRequestException(USER.DOB_IS_BEFORE_NOW);
    }
  }
}
