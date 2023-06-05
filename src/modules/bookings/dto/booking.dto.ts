import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetListBookingDto {
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  carId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  referenceNo?: string;
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsDateString()
  requestStartAt: Date;

  @IsNotEmpty()
  @IsDateString()
  requestEndAt: Date;

  @IsNotEmpty()
  carId: number;

  @IsNotEmpty()
  userId: number;
}

export class UpdateStatusBooking {
  @IsNotEmpty()
  @IsString()
  status: string;
}

export class IdParamsDto {
  @IsNumberString()
  id: number;
}
