import { TestingModule, Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { USER } from './user.mock';
import Mediator from '../shared/events/mediator';

describe('User Service - ', () => {
  let userService: UserService;
  let prismaMock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    prismaMock = {
      user: {
        create: jest.fn().mockImplementation((user) => Promise.resolve(user.data)),
        findMany: jest.fn().mockResolvedValue([USER()]),
        findUnique: jest.fn().mockResolvedValue(USER()),
        findFirst: jest.fn().mockResolvedValue(USER()),
        update: jest.fn().mockResolvedValue(USER()),
        delete: jest.fn(), // O método delete não retorna nada
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Mediator,
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
      jest.spyOn(prismaMock.user, 'findFirst').mockResolvedValue(null);
      const response: any = await userService.createUser(USER());
      expect(response.email).toEqual(USER().email);
    });

    it('Should encrypt the password', async () => {
      let password = "";

      jest.spyOn(prismaMock.user, 'findFirst').mockResolvedValue(null);
      jest.spyOn(prismaMock.user, 'create').mockImplementation((user: any) => {
        password = user.data.password
      });

      await userService.createUser(USER());

      expect(password).toBeDefined();
      expect(password).not.toBe(USER().confirm_password);
    });

    it('Should throw error when email is ready exist', async () => {
      const user = USER();
      jest.spyOn(prismaMock.user, 'findFirst').mockResolvedValue(user);

      try {
        await userService.createUser(user)
        fail("Should throw error")

      } catch (error) {
        expect(error.status).toEqual(400);
        expect(error.message).toEqual(`já existe um usuario com esse email: ${user.email} ou com esse numero de documento ${user.documentNumber}`);
      }

    });
  });

  describe('activeUser ', () => {
    it("should call the update function when user is find", async () => {
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(USER);
      jest.spyOn(prismaMock.user, 'update').mockResolvedValue(USER);

      await userService.activeUser(USER());
      expect(prismaMock.user.update).toHaveBeenCalled();
    });

    it("Should throw error when user is not found", (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null);

      userService.activeUser(USER())
        .then(() => fail("Should throw error"))
        .catch((response) => {
          expect(response.status).toEqual(404);
          expect(response.message).toEqual(`Usuario não encontrado`);
          done();
        });
    });
  })

  it("Should call the getAllUser", async () => {
    jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue(null);

    await userService.getAllUser();
    expect(prismaMock.user.findMany).toHaveBeenCalled();
  });

  describe('Update ', () => {
    it('Should call update the function', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(USER());
      jest.spyOn(prismaMock.user, 'update').mockResolvedValue(USER());

      userService.updateUser(0, USER())
        .catch(() => fail("Should udpate user"))
        .then(() => {
          expect(prismaMock.user.update).toHaveBeenCalled();
          done();
        });
    });

    it('Should throw error when id is not exist', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null);

      userService.updateUser(0, USER())
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
      jest.spyOn(prismaMock.user, 'update').mockResolvedValue(USER);
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(USER);

      UserUpdatePassword = {
        ...USER(),
        password: "NEW PASSWORD",
        current_password: 'Senha123!',
      }
    });

    it('Should call update the function when email exist and password is correct', (done) => {
      const user = USER();
      user.password = bcrypt.hashSync(user.password, 8);
      UserUpdatePassword.password = user.password;
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(user);

      userService.updatePassword(UserUpdatePassword)
        .then(() => {
          expect(prismaMock.user.update).toHaveBeenCalled();
          done();
        });
    });

    it('Should throw error when email is not exist', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null);

      userService.updatePassword(UserUpdatePassword)
        .then(() => fail("Should throw error"))
        .catch((response) => {
          expect(response.status).toEqual(404);
          expect(response.message).toEqual(`Senha ou Email incorretos`);
          done();
        });
    });

    it('Should throw error when password is wrong', (done) => {
      const user = USER();
      user.password = bcrypt.hashSync('wrong password', 8);
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(user);

      UserUpdatePassword.password = bcrypt.hashSync('Senha123!', 8);

      userService.updatePassword(UserUpdatePassword)
        .catch((error) => {
          expect(error.status).toEqual(404);
          expect(error.message).toEqual(`Senha ou Email incorretos`);
          done();
        });
    });
  });

  describe('Delete ', () => {
    it('Should call delete the function', (done) => {
      jest.spyOn(prismaMock.user, 'delete').mockResolvedValue(USER);

      userService.deleteUser(0)
        .catch(() => fail("Should delete user"))
        .then(() => {
          expect(prismaMock.user.delete).toHaveBeenCalled();
          done();
        });
    });

    it('Should throw error when id is not exist', (done) => {
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null);

      userService.updateUser(0, USER())
        .then(() => fail("Should throw error"))
        .catch((response) => {
          expect(response.status).toEqual(404);
          expect(response.message).toEqual(`Usuario não encontrado`);
          done();
        });
    });
  });
});
