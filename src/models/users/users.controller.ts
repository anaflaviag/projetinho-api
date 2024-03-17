import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserData } from './interfaces/create-user';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  createUser(@Body(new ValidationPipe()) body: UserData) {
    return this.usersService.createUser(body);
  }
}
