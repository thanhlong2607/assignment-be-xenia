import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { EUserType } from 'src/enums';
import { UserGuard } from 'src/common/guards/user.guard';
import { CreateCarDto, GetListCarDto, IdParamsDto, UpdateCarDto } from './dto/car.dto';
import { ErrorHelper } from 'src/helpers';
import { CAR } from 'src/constants';

@Controller('cars')
@UseGuards(UserGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @HttpCode(200)
  @Auth([EUserType.EMPLOYEE])
  async getUsers(@Query() query: GetListCarDto) {
    return this.carsService.getCars(query);
  }

  @Post()
  @HttpCode(201)
  @Auth([EUserType.EMPLOYEE])
  async createUser(@Body() payload: CreateCarDto) {
    return this.carsService.createCar(payload);
  }

  @Get('/:id')
  @HttpCode(200)
  @Auth([EUserType.EMPLOYEE])
  async getCar(@Param() param: IdParamsDto) {
    const id = +param.id;

    const car = await this.carsService.findOne({
      where: { id, deletedAt: null },
    });

    if (!car) {
      ErrorHelper.BadRequestException(CAR.CAR_NOT_FOUND);
    }

    return car;
  }

  @Put('/:id')
  @HttpCode(200)
  @Auth([EUserType.EMPLOYEE])
  async updateUser(
    @Param() param: IdParamsDto,
    @Body() payload: UpdateCarDto,
  ) {
    const id = +param.id;
    return this.carsService.updateCar(id, payload);
  }

  @Delete('/:id')
  @HttpCode(200)
  @Auth([EUserType.EMPLOYEE])
  async deleteUser(@Param() param: IdParamsDto) {
    const id = +param.id;

    return await this.carsService.deleteCar(id);
  }
}
