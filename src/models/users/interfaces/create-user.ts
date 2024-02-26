import { IsDateString, IsEmail, IsNumber, IsString } from "class-validator";

export class UserData {
    @IsString()
    name: string;

    @IsDateString()
    birthDate: Date;

    @IsEmail()
    email: string;

    @IsNumber()
    zipCode: number

    @IsString()
    complement: string;
}