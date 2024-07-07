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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { JwtGuard } from '../../src/auth/guard/jwt.guard';
import { GetUserReq } from '../../src/auth/decorator/user.decorator';
import { InsertNoteDto } from './dto/insert.note.dto';
import { UpdateNoteDto } from './dto/update.note.dto';

@ApiBearerAuth() // Enable Bearer token authentication for Swagger
@ApiTags('Notes') // Tag all endpoints under 'notes' for Swagger
@UseGuards(JwtGuard)
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post()
  async insert(
    @GetUserReq('id', ParseIntPipe) userId: number,
    @Body() insertNoteDto: InsertNoteDto
  ) {
    return this.noteService.insert(userId, insertNoteDto);
  }

  @Get() // notes/
  async getAll(@GetUserReq('id') userId: number) {
    return this.noteService.getAll(userId);
  }

  @Get(':id') //  notes/:id
  async getById(@Param('id', ParseIntPipe) noteId: number) {
    const note = await this.noteService.getById(noteId);
    return note;
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
