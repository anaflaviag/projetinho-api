import { Type } from 'class-transformer';
import { NoteType } from './../schema/notes.schema';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class Checklist {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;
}

export class NotesData {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(NoteType)
  @IsNotEmpty()
  type: NoteType;

  @IsString()
  @IsOptional()
  text: string;

  @IsArray()
  @IsOptional()
  checklist: Checklist[];
}
