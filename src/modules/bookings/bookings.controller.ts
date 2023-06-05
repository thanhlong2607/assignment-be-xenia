import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { EUserType } from 'src/enums';
import { CreateBookingDto, GetListBookingDto, IdParamsDto, UpdateStatusBooking } from './dto/booking.dto';
import { UserGuard } from 'src/common/guards/user.guard';

@Controller('bookings')
@UseGuards(UserGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @HttpCode(200)
  @Auth([EUserType.EMPLOYEE])
  async getUsers(@Query() query: GetListBookingDto) {
    return this.bookingsService.getBookings(query);
  }

  @Get()
  @HttpCode(201)
  @Auth([EUserType.EMPLOYEE])
  async getList(@Body() payload: CreateBookingDto) {
    return this.bookingsService.createBooking(payload);
  }

  @Post()
  @HttpCode(201)
  @Auth([EUserType.EMPLOYEE])
  async createUser(@Body() payload: CreateBookingDto) {
    return this.bookingsService.createBooking(payload);
  }

  @Put('/:id')
  @HttpCode(200)
  @Auth([EUserType.EMPLOYEE])
  async updateUser(@Param() param: IdParamsDto, @Body() payload: UpdateStatusBooking) {
    const id = +param.id;
    return this.bookingsService.updateStatusBooking(id, payload);
  }
}
