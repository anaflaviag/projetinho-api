import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserData } from './interfaces/create-user';
import { Filters } from './interfaces/user-filters';
import { UpdateUserData } from './interfaces/update-user';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  createUser(@Body() body: UserData) {
    return this.usersService.createUser(body);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get('get/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Get('get')
  getUsers(@Query() filters: Filters) {
    return this.usersService.getUsers(filters);
  }

  @Put('update/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserData) {
    return this.usersService.updateUser(id, body);
  }
}
