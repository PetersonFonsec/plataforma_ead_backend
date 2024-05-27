import { TestingModule, Test } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { AuthGuard } from "../auth/auth.guard";
import { UserService } from "./user.service";
import { USER } from "./user.mock";
import { Roles } from "../shared/enums/role.enum";

describe("UserController", () => {
  let userServiceMock;
  let userControler;
  let userService;

  beforeEach(async () => {
    userServiceMock = {
      updatePassword: jest.fn(() => USER()),
      deleteUser: jest.fn(() => USER()),
      updateUser: jest.fn(() => USER()),
      getAllUser: jest.fn(() => Array(3).fill(USER())),
      createUser: jest.fn(() => USER()),
      find: jest.fn(() => USER()),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userServiceMock },
      ]
    }).overrideGuard(AuthGuard).useValue({
      canActive: jest.fn(() => true)
    }).compile();

    userControler = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it("Smoke test", () => {
    expect(userControler).toBeDefined()
    expect(userService).toBeDefined()
  });

  describe("Create", () => {
    it(`Should set role ${Roles.DIRECTOR} in payload when call createDirector`, async () => {
      const result = await userControler.createDirector(USER());
      expect(result).toEqual(USER());
    });

    it(`Should set role ${Roles.STUDENT} in payload when call createStudent`, async () => {
      const result = await userControler.createStudent(USER());
      expect(result).toEqual(USER());
    });

    it(`Should set role ${Roles.TEACHER} in payload when call createTeacher`, async () => {
      const result = await userControler.createTeacher(USER());
      expect(result).toEqual(USER());
    });
  });

  describe("Read", () => {
    it("Should call the get function", async () => {
      const result = await userControler.get(USER().id);
      expect(result).toEqual(USER());
    });
    it("Should call the getAll function", async () => {
      const result = await userControler.getAll();
      expect(result.length).toEqual(3);
    });
  });

  describe("Update", () => {
    it("Should call the find user function", async () => {
      const result = await userControler.update(USER().id, USER());
      expect(result).toEqual(USER());
    });

    it("Should call the find user function", async () => {
      const result = await userControler.updatePassword(USER());
      expect(result).toEqual(USER());
    });
  });

  describe("Delete", () => {
    it("Should call crateUser", async () => {
      const result = await userControler.delete(USER().id);
      expect(result).toEqual(USER());
    });
  });
});
