import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AuthJWTDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
