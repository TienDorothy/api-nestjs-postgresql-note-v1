import { PrismaService } from './../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // returns request for Controller
  async validate(payload: { sub: number; email: string }) {
    console.log('payload validate :>> ', payload);
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    delete user.hashedPassword;
    return user;
  }
}
