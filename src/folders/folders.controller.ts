import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@Body() createFolderDto: CreateFolderDto, @Request() req) {
    return this.foldersService.create(createFolderDto, req.user);
  }

  @Get()
  findAll( @Request() req) {
    return this.foldersService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string,  @Request() req) {
    return this.foldersService.findOne(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto,  @Request() req) {
    return this.foldersService.update(id, updateFolderDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.foldersService.remove(id, req.user);
  }
}