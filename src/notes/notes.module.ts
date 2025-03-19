import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { FoldersModule } from 'src/folders/folders.module';
import { Folder } from 'src/folders/entities/folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Folder]), FoldersModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule { }
