import { IsDateString, IsEmail, IsString } from 'class-validator';

export class UserData {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthDate: Date;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
