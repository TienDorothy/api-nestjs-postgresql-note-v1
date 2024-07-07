// src/auth/auth.controller.ts
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger'; // Import decorators
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('register') // POST /auth/register
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('login') // POST /auth/login
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
