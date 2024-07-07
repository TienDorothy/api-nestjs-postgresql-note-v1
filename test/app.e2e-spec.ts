import { PrismaService } from './../src/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
const PORT = 3000;

describe('Start App', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(PORT);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDB();
    pactum.request.setBaseUrl(`http://localhost:${PORT}`);
  });

  // Test authentication
  const randomNumber: number = Math.floor(Math.random() * 100);
  const user: object = {
    email: `test_${randomNumber}@gmail.com`,
    password: `test_${randomNumber}`,
  };
  describe('Test Authentication', () => {
    describe('Register', () => {
      it('Start register test:: ', () => {
        let userErr = {
          email: '',
          password: '',
        };
        return pactum.spec().post('/auth/register').withBody(user).expectStatus(201).inspect();
      });
    });

    describe('Login', () => {
      it('Start login test:: ', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(user)
          .expectStatus(201)
          .stores('accessToken', 'accessToken')
          .inspect();
      });
    });

    // Check JWT
    describe('JWT test', () => {
      it('Check token:: ', () => {
        return pactum
          .spec()
          .get('/users')
          .withHeaders({
            Authorization: `Bearer $S{accessToken}`, //$S
          })
          .expectStatus(200)
          .inspect();
      });
    });
  });

  afterAll(async () => {
    app.close();
  });

  it.todo('End test');
});
