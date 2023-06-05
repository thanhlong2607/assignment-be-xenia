import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @MaxLength(100, { message: 'The Email field no more than 100 characters' })
  @MinLength(16, { message: 'The Email must be between 16 and 100 characters long.' })
  @IsString()
  @IsNotEmpty({ message: 'The Email field is required!' })
  email: string;

  @MaxLength(32, { message: 'The Password field is less than 32 characters.' })
  @MinLength(6, { message: 'The Password field is from 6 characters or more' })
  @IsString()
  @IsNotEmpty({ message: 'This Password field is required' })
  password: string;
}
