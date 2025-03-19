import { IsNotEmpty, IsString, IsEnum, IsArray, IsOptional, IsInt, ValidateIf, IsUUID } from 'class-validator';
import { NoteType } from '../enum/note-type';


export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Type is required' })
  @IsEnum(NoteType, { message: 'Type must be either "TEXT_NOTES" or "LIST_NOTES"' })
  type: NoteType;

  @ValidateIf((o) => o.type === NoteType.TEXT)
  @IsNotEmpty()
  @IsString()
  text_notes?: string;

  @ValidateIf((o) => o.type === NoteType.LIST)
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  list_notes?: string[]; 

  @IsNotEmpty()
  @IsUUID()
  folder: string;
}