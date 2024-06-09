import { Body, Controller, Post } from '@nestjs/common';
import { NotesData } from './interfaces/create-notes';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('create')
  async createNote(@Body() body: NotesData) {
    return this.notesService.createNotes(body);
  }
}
