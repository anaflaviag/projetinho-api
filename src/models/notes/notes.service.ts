import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotesData } from './interfaces/create-notes';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument, NoteType } from './schema/notes.schema';
import { validateId } from 'src/utils/validate-id';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteDocument: Model<NoteDocument>,
  ) {}

  async createNotes(noteBody: NotesData) {
    const titleExists = await this.noteDocument.findOne({
      title: noteBody.title,
    });

    if (titleExists) {
      throw new HttpException(
        'A note with the same title already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (noteBody.type === NoteType.text && !noteBody.text) {
      throw new HttpException('missing a valid text', HttpStatus.BAD_REQUEST);
    }

    if (noteBody.type === NoteType.checklist && !noteBody.checklist?.length) {
      throw new HttpException(
        'missing a valid checklist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const note = await this.noteDocument.create(noteBody);
    return {
      id: note._id,
      message: 'Note created with sucess',
    };
  }

  async getNote(id: string) {
    validateId(id);
    const note = await this.noteDocument.findById(id);
    return note;
  }
}
