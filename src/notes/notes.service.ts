import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { Folder } from 'src/folders/entities/folder.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
    @InjectRepository(Folder) private readonly folderRepository: Repository<Folder>
  ) {}

  async create(createNoteDto: CreateNoteDto, user) {
    const folder = await this.folderRepository.findOne({
      where: { id: createNoteDto.folder, user: { id: user.userId } },
    });

    if (!folder) {
      throw new NotFoundException(`Folder with ID ${createNoteDto.folder} not found or not accessible`);
    }

    const note = this.noteRepository.create({
      ...createNoteDto,
      folder,
      user:user.userId,
    });

    return await this.noteRepository.save(note);
  }

  async findAll(user, folderId?: string, search?: string) {
    const query = this.noteRepository.createQueryBuilder('note')
      .where('note.userId = :userId', { userId: user.userId })
      .leftJoinAndSelect('note.folder', 'folder');

    if (folderId) {
      query.andWhere('note.folderId = :folderId', { folderId });
    }

    if (search) {
      query.andWhere('(note.title ILIKE :search OR note.text_notes ILIKE :search)', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async findOne(id: string, user) {
    const note = await this.noteRepository.findOne({
      where: { id, user: { id: user.userId } },
      relations: ['folder'],
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found or not accessible`);
    }

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, user) {
    const note = await this.findOne(id, user); 
    Object.assign(note, updateNoteDto);

    return await this.noteRepository.save(note);
  }

  async remove(id: string, user) {
    const note = await this.findOne(id, user); 

    return await this.noteRepository.remove(note);
  }
}
