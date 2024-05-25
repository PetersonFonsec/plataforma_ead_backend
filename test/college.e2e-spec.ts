import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';

import { AppModule } from "../src/app.module";

describe("College flow", () => {
  let app: INestApplication;
  let token;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response  = await request(app.getHttpServer())
      .post("/auth/login");

    token = response.body.access_token;
  });

  afterAll(() => {
    app.close();
  });

  it("Should return a token when user authenticate", ()=> {});
});
