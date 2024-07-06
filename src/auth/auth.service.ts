import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { AuthJWTDto } from './dto/auth-jwt.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(authDto: AuthDto) {
    try {
      //  hash password
      const hashedPassword = await argon.hash(authDto.password);

      // insert data to DB
      const user = await this.prismaService.user.create({
        data: {
          email: authDto.email,
          hashedPassword: hashedPassword,
          firstName: 'f',
          lastName: 'l',
        },
        select: {
          id: true,
          email: true,
          cratedAt: true,
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        // throw new ForbiddenException(error.message);
        throw new ForbiddenException('Error in credentials');
      }
    }
  }

  async login(authDto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User or password incorrect');
    }

    const passwordMatch = await argon.verify(user.hashedPassword, authDto.password);
    if (!passwordMatch) {
      throw new ForbiddenException('User or password incorrect');
    }

    // return { email: user.email };
    delete user.hashedPassword;

    //  generate token from email and id
    const authJWTDto = new AuthJWTDto();
    authJWTDto.id = user.id;
    authJWTDto.email = user.email;

    const accessToken = await this.signJwtToken(authJWTDto);

    return accessToken;
  }

  // convert to JWT
  async signJwtToken(authJWTDto: AuthJWTDto): Promise<{ accessToken: string }> {
    const payload = { sub: authJWTDto.id, email: authJWTDto.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRES'),
      secret: this.configService.get('JWT_SECRET'),
    });

    return { accessToken: accessToken };
  }
}
