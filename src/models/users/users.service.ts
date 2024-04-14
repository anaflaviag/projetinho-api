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
import { Filters } from './interfaces/user-filters';

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
    this.validateId(id);
    const user = await this.validateUser(id);
    await this.userDocument.deleteOne({ _id: user._id });
    return {
      id: user._id,
      message: 'User deleted with sucess',
    };
  }

  async getUser(id: string) {
    this.validateId(id);
    const user = await this.validateUser(id);
    return {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
    };
  }

  async getUsers(filters: Filters) {
    const queryFilters = {};
    const { pageNumber, pageItems, name, lastName, orderBy } = filters;
    let skipNumber = 0;
    let limitNumber = 10;

    if (pageNumber && pageItems && pageNumber > 0) {
      skipNumber = (pageNumber - 1) * pageItems;
      limitNumber = pageItems;
    }

    if (name) {
      queryFilters['name'] = name;
    }

    if (lastName) {
      queryFilters['lastName'] = lastName;
    }

    const users = await this.userDocument
      .find(queryFilters)
      .limit(limitNumber)
      .skip(skipNumber);
    return users.map((obj) => {
      return {
        name: obj.name,
        lastName: obj.lastName,
        email: obj.email,
        birthDate: obj.birthDate,
      };
    });
  }

  private validateId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
  }

  private async validateUser(id: string) {
    const user = await this.userDocument.findOne({ _id: id });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
