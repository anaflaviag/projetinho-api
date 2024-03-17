import { Injectable } from '@nestjs/common';
import { UserData } from './interfaces/create-user';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userDocument: Model<UserDocument>,
    private readonly requestService: HttpService
  ) {}

  async createUser(userBody: UserData) {
    const user = await this.userDocument.create(userBody);
    return {
      id: user._id,
      message: 'User created with sucess',
    };
  }
}
