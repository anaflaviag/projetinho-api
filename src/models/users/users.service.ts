import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserData } from './interfaces/create-user';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userDocument: Model<UserDocument>,
    private readonly requestService: HttpService,
  ) {}

  async createUser(userBody: UserData) {
    const validateEmail = await this.userDocument.findOne({
      email: userBody.email,
    });
    if (validateEmail) {
      throw new HttpException(
        'already exists an user with the same e-mail',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userDocument.create(userBody);
    return {
      id: user._id,
      message: 'User created with sucess',
    };
  }

  async deleteUser(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userDocument.findOneAndDelete({ _id: id });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return {
      id: user._id,
      message: 'User deleted with sucess',
    };
  }
}
