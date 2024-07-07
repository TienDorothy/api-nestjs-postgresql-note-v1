import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertNoteDto } from './dto/insert.note.dto';
import { UpdateNoteDto } from './dto/update.note.dto';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}

  async getAll(userId: number) {
    const notes = await this.prismaService.note.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return notes;
  }
  async getById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new NotFoundException(`Note not found with id: ${noteId}`);
    }
    return note;
  }

  async insert(userId: number, insertNoteDto: InsertNoteDto) {
    const note = await this.prismaService.note.create({
      data: {
        title: insertNoteDto.title,
        description: insertNoteDto.description,
        url: insertNoteDto.url,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return note;
  }

  async update(noteId: number, updateNoteDto: UpdateNoteDto) {
    await this.getById(noteId);
    const updateNote = await this.prismaService.note.update({
      where: { id: noteId },
      data: updateNoteDto,
    });

    return updateNote;
  }

  async delete(noteId: number) {
    await this.getById(noteId);
    const note = await this.prismaService.note.delete({
      where: { id: noteId },
    });
    return note;
  }
}
