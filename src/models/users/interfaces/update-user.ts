import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserData {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsOptional()
  password?: string;
}
