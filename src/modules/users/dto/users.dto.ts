import { IsEmail, IsBoolean, IsDateString, IsNotEmpty, IsNumberString, IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { EUserType } from 'src/enums';

export class GetListUserDto {
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  dob?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  dob: Date

  @IsOptional()
  @IsDateString()
  gender: string

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  phoneCountryCode: string;

  @IsOptional()
  @IsString()
  nationality: string;
}

export class UpdateUserDto extends CreateUserDto {}

export class UpdateStatusDto {
  @IsBoolean()
  status: boolean;
}

export class IdParamsDto {
  @IsNumberString()
  id: number;
}
