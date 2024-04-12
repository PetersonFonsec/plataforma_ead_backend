/* eslint-disable prettier/prettier */
import { TestingModule, Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { USER } from '../user/user.mock';

describe('Auth Service - ', () => {
  let authService: AuthService;
  let prismaMock;
  let jwtMock;
  let token;

  beforeEach(async () => {
    prismaMock = {
      user: {
        create: jest.fn().mockReturnValue(USER),
        findMany: jest.fn().mockResolvedValue([USER]),
        findUnique: jest.fn().mockResolvedValue(USER),
        update: jest.fn().mockResolvedValue(USER),
        delete: jest.fn(), // O método delete não retorna nada
      },
    };

    token = {
      expiresIn: 'time',
      subject: USER.id
    }

    jwtMock = {
      sign: jest.fn().mockReturnValue(btoa(token)),
      verify: jest.fn().mockResolvedValue(true),
      decode: jest.fn().mockResolvedValue(token),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
        AuthService, UserService,
      ],
    }).compile();

    authService = module.get(AuthService);

    jest.spyOn(bcrypt, 'hashSync').mockImplementation(() => USER.password);
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
  });

  it('smoke test', () => {
    expect(authService).toBeTruthy();
  });

  describe('login - ', () => {
    it('Should create token', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => USER);

      authService.login(USER).then((response) => {
        expect(response.access_token).toBeDefined();
        done()
      }).catch((error) => {
        console.log(error)
        fail("Should return token");
      });
    });

    it('Should return error when password is wrong', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => null);

      const payload = JSON.parse(JSON.stringify(USER));
      payload.password = "invalid password";

      authService.login(payload).then(() => {
        fail("Should return an error");
      }).catch((error) => {
        expect(error.message).toEqual("Senha ou Email incorretos");
        expect(error.status).toEqual(404);
        done()
      })
    });
  });

  describe('register - ', () => {
    it('Should return error when email is nor exist', () => { });

    it('Should return error when password is wrong', () => { });

    it('Should return response when password and email is corret', () => { });
  });
});
