import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InsertNoteDto {
  @ApiProperty({
    example: 'The title',
    description: 'The title of the note',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Description',
    description: 'The description of the note (optional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'Nestjs.com',
    description: 'The URL related to the note',
  })
  @IsString()
  @IsNotEmpty()
  url: string;
}
