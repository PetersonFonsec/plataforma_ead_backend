import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';

import { AppModule } from "../src/app.module";
import { user_director, user_director_secundary } from "./__mock__/users";

describe("Auth flow", () => {
  let app: INestApplication;
  const validPassword = "Senha123!";

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it("Should return a token when user authenticate", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: user_director.email,
        password: validPassword
      });

    expect(response.statusCode).toEqual(201)
    expect(typeof response.body.access_token).toEqual('string')
  });

  it("Should return a token when create a new director", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/register/director")
      .send({
        email: user_director_secundary.email,
        name: user_director_secundary.name,
        password: validPassword,
        documentNumber: user_director_secundary.documentNumber,
        confirm_password:  validPassword
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.access_token).toEqual('string');
   });

  it("Should return an error when password is wrong", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: user_director.email,
        password: "wrong password",
        confirm_password:  validPassword
      });

    expect(response.statusCode).toEqual(404)
    expect(response.body.message).toEqual('Senha ou Email incorretos');
  });

  it("Should return an error when password is diferent to confirm_password in create user", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/register/director")
      .send({
        email: user_director.email,
        password: "Senha123",
        confirm_password:  "Senha123!",
      });

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('as senhas não são iguais');
  });

  it("Should return an error when user is ready exist", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/register/director")
      .send({
        email: user_director.email,
        password: "Senha123!",
        confirm_password:  "Senha123!",
      });

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual( `já existe um usuario com esse email: ${user_director.email} ou com esse numero de documento ${user_director.documentNumber}`);
  });
});
