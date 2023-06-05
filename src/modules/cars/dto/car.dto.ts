import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetListCarDto {
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  carNumber?: string;
}

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  build: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  mode: string;

  @IsNotEmpty()
  @IsBoolean()
  isFeature: boolean;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  carNumber: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}

export class UpdateCarDto extends CreateCarDto {}

export class IdParamsDto {
  @IsNumberString()
  id: number;
}
