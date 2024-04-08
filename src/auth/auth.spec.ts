/* eslint-disable prettier/prettier */
import { TestingModule, Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('Auth Service - ', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtService, PrismaService],
    }).compile();

    authService = module.get(AuthService);
  });

  it('smoke test', () => {
    expect(authService).toBeTruthy();
  });

  describe('login - ', () => {
    it('Should return error when email is nor exist', () => { });

    it('Should return error when password is wrong', () => { });

    it('Should return response when password and email is corret', () => { });
  });

  describe('register - ', () => {
    it('Should return error when email is nor exist', () => { });

    it('Should return error when password is wrong', () => { });

    it('Should return response when password and email is corret', () => { });
  });
});
