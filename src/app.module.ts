import { Module } from '@nestjs/common';
import { UsersController } from './models/users/users.controller';
import { UsersService } from './models/users/users.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/users/schemas/user.schema';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/projetinho-api-mongo'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
