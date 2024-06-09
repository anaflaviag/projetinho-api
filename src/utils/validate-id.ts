import { HttpException, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';

export const validateId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
  }
};
