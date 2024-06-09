import { Module } from '@nestjs/common';
import { UsersController } from './models/users/users.controller';
import { UsersService } from './models/users/users.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/users/schema/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Note, NoteSchema } from './models/notes/schema/notes.schema';
import { NotesController } from './models/notes/notes.controller';
import { NotesService } from './models/notes/notes.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    HttpModule.register({
      timeout: 10000,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongo_url'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Note.name, schema: NoteSchema },
    ]),
  ],
  controllers: [UsersController, NotesController],
  providers: [UsersService, NotesService],
})
export class AppModule {}
