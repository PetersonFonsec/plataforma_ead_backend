/* eslint-disable prettier/prettier */
import { TestingModule, Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { USER } from './user.mock';

describe('Auth Service - ', () => {
  let userService: UserService;
  let prismaMock;

  afterEach(() => {
    jest.clearAllMocks();
  });

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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    userService = module.get(UserService);
  });

  it('smoke test', () => {
    expect(userService).toBeTruthy();
  });

  describe('Create', () => {
    it('Should return the user created', async () => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => null);
      const response: any = await userService.createUser(USER);
      expect(response).toEqual(USER);
    });

    it('Should throw error when email is ready exist', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => JSON.parse(JSON.stringify(USER)));

      userService.createUser(USER)
        .then(() => fail("Should throw error"))
        .catch((response) => {
          expect(response.status).toEqual(400);
          expect(response.message).toEqual(`já existe um usuario com esse email: peterson@gmail.com`);
          done();
        });
    });

    it('Should encrypt the password', async () => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => null);
      const response: any = await userService.createUser(USER);
      expect(response.password).not.toBe("peterson@gmail.com");
    });
  });

  describe('activeUser ', () => {
    it("should call the update function when user is find", async () => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => USER);
      jest.spyOn(prismaMock.user, 'update').mockImplementation(() => USER);
      await userService.activeUser(USER);
      expect(prismaMock.user.update).toHaveBeenCalled();
    });

    it("Should throw error when user is not found", (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => null);

      userService.activeUser(USER)
        .then(() => fail("Should throw error"))
        .catch((response) => {
          expect(response.status).toEqual(404);
          expect(response.message).toEqual(`Usuario não encontrado`);
          done();
        });
    });
  })

  it("Should call the getAllUser", async () => {
    jest.spyOn(prismaMock.user, 'findMany').mockImplementation(() => null);

    await userService.getAllUser();
    expect(prismaMock.user.findMany).toHaveBeenCalled();
  });

  describe('Update ', () => {
    it('Should call update the function', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => Promise.resolve(USER));
      jest.spyOn(prismaMock.user, 'update').mockImplementation(() => Promise.resolve(USER));

      userService.updateUser(0, USER)
        .catch(() => fail("Should udpate user"))
        .then(() => {
          expect(prismaMock.user.update).toHaveBeenCalled();
          done();
        });
    });

    it('Should throw error when id is not exist', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => null);

      userService.updateUser(0, USER)
        .then(() => fail("Should throw error"))
        .catch((response) => {
          expect(response.status).toEqual(404);
          expect(response.message).toEqual(`Usuario não encontrado`);
          done();
        });
    });
  });

  describe('Update Password ', () => {
    let UserUpdatePassword: any;

    beforeEach(() => {
      jest.spyOn(bcrypt, 'hashSync').mockImplementation(() => USER.password);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
      jest.spyOn(prismaMock.user, 'update').mockImplementation(() => Promise.resolve(USER));
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => Promise.resolve(USER));

      UserUpdatePassword = {
        ...USER,
        password: "NEW PASSWORD",
        current_password: 'Senha123!',
      }
    });

    it('Should call update the function', (done) => {
      userService.updatePassword(UserUpdatePassword)
        .catch((error) => {
          fail(error)
        })
        .then(() => {
          expect(prismaMock.user.update).toHaveBeenCalled();
          done();
        });
    });

    it('Should throw error when email is not exist', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => null);

      userService.updatePassword(UserUpdatePassword)
        .then(() => fail("Should throw error"))
        .catch((response) => {
          expect(response.status).toEqual(404);
          expect(response.message).toEqual(`Senha ou Email incorretos`);
          done();
        });
    });

    it('Should throw error when password is wrong is not exist', (done) => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

      userService.updatePassword(UserUpdatePassword)
        .then(() => fail("Should throw error"))
        .catch((response) => {
          expect(response.status).toEqual(404);
          expect(response.message).toEqual(`Senha ou Email incorretos`);
          done();
        });
    });
  });

  describe('Delete ', () => {
    it('Should call delete the function', (done) => {
      jest.spyOn(prismaMock.user, 'delete').mockImplementation(() => Promise.resolve(USER));

      userService.deleteUser(0)
        .catch(() => fail("Should delete user"))
        .then(() => {
          expect(prismaMock.user.delete).toHaveBeenCalled();
          done();
        });
    });

    it('Should throw error when id is not exist', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockImplementation(() => null);

      userService.updateUser(0, USER)
        .then(() => fail("Should throw error"))
        .catch((response) => {
          expect(response.status).toEqual(404);
          expect(response.message).toEqual(`Usuario não encontrado`);
          done();
        });
    });
  });
});
