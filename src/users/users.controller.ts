import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'; // Import decorators from swagger
import { User } from '@prisma/client';
import { GetUserReq } from '../../src/auth/decorator/user.decorator';
import { JwtGuard } from '../../src/auth/guard/jwt.guard';

@ApiTags('Users') // Define tags for the controller
@Controller('users')
export class UsersController {
  @UseGuards(JwtGuard)
  @ApiBearerAuth() // Specify Bearer authentication for Swagger
  @Get()
  async get(@GetUserReq('email') user: User): Promise<User> {
    return user;
  }
}
