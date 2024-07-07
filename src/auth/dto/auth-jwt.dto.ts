import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthJWTDto {
  @ApiProperty({ type: Number, example: 1, description: 'User ID' })
  @IsNumber({}, { message: 'Must be a number' })
  @IsNotEmpty({ message: 'Must not be empty' })
  id: number;

  @ApiProperty({ type: String, example: 'user@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Must be a valid email address' })
  @IsNotEmpty({ message: 'Must not be empty' })
  email: string;
}
