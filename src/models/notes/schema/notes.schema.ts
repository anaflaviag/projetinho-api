import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

export enum NoteType {
  'text' = 'text',
  'checklist' = 'checklist',
}

@Schema({ _id: false })
export class Checklist {
  @Prop({ required: false })
  task: string;

  @Prop({ required: false })
  completed: boolean;
}

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: NoteType, default: NoteType.text })
  type: NoteType;

  @Prop({ required: false })
  text: string;

  @Prop({ required: false })
  checklist: Checklist[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);

/*
{
    "title": "Ida ao shopping",
    "type": "text",
    "text": "Quando eu for shopping compra uma blusinha"
}


{
    "title": "Ida ao shopping",
    "type": "checklist",
    "checklist": [
        {
            "task": "comprar blusa",
            "completed": false
        },
        {
            "task": "comprar shortinho",
            "completed": true
        }
    ]
}
*/
