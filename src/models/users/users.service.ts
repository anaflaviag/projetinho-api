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
import { UpdateUserData } from './interfaces/update-user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userDocument: Model<UserDocument>,
  ) {}

  async createUser(userBody: UserData) {
    const validateEmail = await this.userDocument.findOne({
      email: userBody.email,
    });

    userBody.password = await bcrypt.hash(userBody.password, 10);

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

    if (lastName) queryFilters['lastName'] = lastName;

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

  async updateUser(id: string, body: UpdateUserData) {
    this.validateId(id);
    const user = await this.validateUser(id);

    const updateData = {};
    const { name, lastName, birthDate, password } = body;

    if (name) updateData['name'] = name;
    if (lastName) updateData['lastName'] = lastName;
    if (birthDate) updateData['birthDate'] = birthDate;
    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        throw new HttpException(
          'new password must be different from the last one',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData['password'] = hashedPassword;
    }

    await this.userDocument.updateOne({ _id: id }, { $set: updateData });

    return {
      id: id,
      message: 'User updated with sucess',
    };
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
