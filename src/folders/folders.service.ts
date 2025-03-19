import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoldersService {

  constructor(@InjectRepository(Folder) private readonly folderRepository: Repository<Folder>) { }

  async create(createFolderDto: CreateFolderDto, user) {
    const folder = this.folderRepository.create({
      ...createFolderDto,
      user: user.userId, 
    });
    return await this.folderRepository.save(folder);
  }

  async findAll(user) {
    return await this.folderRepository.find({
      where: { user: { id: user.userId } },
      relations: ['user'], 
    });
  }

  async findOne(id: string, user) {
    const folder = await this.folderRepository.findOne({
      where: { id, user: { id: user.userId } },
    });

    if (!folder) throw new NotFoundException(`Folder with ID ${id} not found or not accessible`);
    return folder;
  }

  async update(id: string, updateFolderDto: UpdateFolderDto, user) {
    const folder = await this.findOne(id, user); 
    Object.assign(folder, updateFolderDto);
    return await this.folderRepository.save(folder);
  }

  async remove(id: string, user) {
    const folder = await this.findOne(id, user); 
    return await this.folderRepository.remove(folder);
  }
}
