import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDecorator } from 'src/auth/decorator/user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtGuard) //protect endpoint
  @Get()
  get(@UserDecorator() user: User) {
    // console.log(req);
    return user;
  }
}
