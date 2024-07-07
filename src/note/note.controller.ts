import { NoteService } from './note.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../src/auth/guard/jwt.guard';
import { GetUserReq } from '../../src/auth/decorator/user.decorator';
import { InsertNoteDto } from './dto/insert.note.dto';
import { UpdateNoteDto } from './dto/update.note.dto';

@UseGuards(JwtGuard)
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get() // notes/
  async getAll(@GetUserReq('id') userId: number) {
    return this.noteService.getAll(userId);
  }
  @Get(':id') //  notes/:id
  async getById(@Param('id', ParseIntPipe) noteId: number) {
    const note = this.noteService.getById(noteId);
    console.log(note);
    return note;
  }

  @Post()
  async insert(
    @GetUserReq('id', ParseIntPipe) userId: number,
    @Body() insertNoteDto: InsertNoteDto
  ) {
    return this.noteService.insert(userId, insertNoteDto);
  }

  @Patch(':id') // notes/:id
  async update(@Param('id', ParseIntPipe) noteId: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(noteId, updateNoteDto);
  }

  @Delete(':id') // notes/:id
  async delete(@Param('id', ParseIntPipe) noteId: number) {
    return this.noteService.delete(noteId);
  }
}
