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
    it('Should create token when login is success', (done) => {
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
    it('Should return error when email is is ready exist', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => JSON.parse(JSON.stringify(USER)));

      authService.register(USER).then(() => fail("Should throw error"))
        .catch((response) => {
          expect(response.status).toEqual(400);
          expect(response.message).toEqual(`já existe um usuario com esse email: peterson@gmail.com`);
          done();
        });
    });

    it('Should email, name, id and access_token when user is created with success ', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => null);

      authService.register(USER).catch(() => fail("Should create user"))
        .then((response) => {
          expect(response.email).toEqual(USER.email);
          expect(response.name).toEqual(USER.name);
          expect(response.id).toEqual(USER.id);
          expect(response.access_token).toBeDefined();
          done();
        });
    });
  });

  describe('forgetPassword - ', () => {
    it('Should return error when email is not found', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => null);

      authService.forgetPassword(USER).then(() => {
        fail("Should an erro when email is not found");
      }).catch((error) => {
        expect(error.message).toEqual('Email não encontrado');
        done()
      });
    });

    it('Should return true when email is found with success', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => USER);

      authService.forgetPassword(USER).then((respone) => {
        expect(respone).toBeTruthy()
        done()
      }).catch(() => {
        fail("Should return true when email is found with success");
      });
    });
  });
});
