import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  // for test : test/app.e2e-spec.ts
  cleanDB() {
    // 1-N relations
    return this.$transaction([
      this.note.deleteMany(),
      this.user.deleteMany(),
      // 1-N relations
    ]);
  }
}
