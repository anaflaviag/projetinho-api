import { Module } from '@nestjs/common';
import { UsersController } from './models/users/users.controller';
import { UsersService } from './models/users/users.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
