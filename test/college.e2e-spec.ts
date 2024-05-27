import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';

import { AppModule } from "../src/app.module";
import { user_director } from "./__mock__/users";

describe("College flow", () => {
  let app: INestApplication;
  let token;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .post("/auth/login").send({
        password: 'Senha123!',
        email: user_director.email
      });

    token = response.body.access_token;
  });

  afterAll(() => {
    app.close();
  });

  it("Should return a token when user authenticate", () => { });
});
