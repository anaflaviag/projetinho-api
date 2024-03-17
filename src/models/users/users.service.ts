import { Injectable } from '@nestjs/common';
import { UserData } from './interfaces/create-user';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(private readonly requestService: HttpService) {}

  async createUser(userBody: UserData) {
    return {
      id: '1',
      message: 'Data received with sucess',
    };
  }
}
