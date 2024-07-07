import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty({ example: 'My Note Title update', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Description update of my note', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://example.com', required: false })
  @IsString()
  @IsOptional()
  url?: string;
}
