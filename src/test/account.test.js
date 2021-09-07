import mongoose from "mongoose";
import supertest from "supertest";
import serverConfig from "../app";
import Mongo from "../db/mongo";
import env from "../configs";
import { getDatabaseUrlMongo } from "../utils/libs/utils";

const api = supertest(serverConfig.app);
const mongoDB = new Mongo(
  getDatabaseUrlMongo(env.ENVIRONMENT || "DEVELOPMENT")
);

const credentials = {
  username: "user-tests",
  password: "Usertests123*",
};

const databaseConnection = async () => {
  await mongoDB.connectMongoDB();
  const responseLogin = await api
    .post("/api/v1/authentication/login")
    .send(credentials);
  const { token } = responseLogin.body.data;
  return token;
};

describe("Component - account", () => {
  test("Endpoint - Create Account - If there is not bearer token should return status code 401", async () => {
    const newAccount = {
      name: "ACCOUNT NAME",
      description: "EXAMPLE DESCRIPTION",
      billingInformation: {
        companyName: "COMPANY",
        name: "BILL ACCOUNT NAME",
        phone: "1234567890",
        email: "account1@account1.com",
        address: "California 54-66",
        zipCode: "33020",
        city: "Florida",
        country: "USA",
        state: "FL",
      },
      contactInformation: {
        name: "ALEXANDER IBAI",
        phone: "1234567890",
        email: "alexander@account1.com",
      },
      active: true,
    };
    await mongoDB.connectMongoDB();

    await api
      .post("/api/v1/scope")
      .send(newAccount)
      .expect("Content-Type", /application\/json/)
      .expect(401);
  });

  test("Endpoint - Create Account - If account name is not send in the request, should return a status code 400", async () => {
    const newAccount = {
      description: "EXAMPLE DESCRIPTION",
      billingInformation: {
        companyName: "COMPANY",
        name: "BILL ACCOUNT NAME",
        phone: "1234567890",
        email: "account1@account1.com",
        address: "California 54-66",
        zipCode: "33020",
        city: "Florida",
        country: "USA",
        state: "FL",
      },
      contactInformation: {
        name: "ALEXANDER IBAI",
        phone: "1234567890",
        email: "alexander@account1.com",
      },
      active: true
    };
    const token = await databaseConnection();

    await api
      .post("/api/v1/account")
      .send(newAccount)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
     .expect(400);
  });

  test("Endpoint - Create Account - If account description is not send in the request, should return a status code 400", async () => {
    const newAccount = {
      name: "ACCOUNT NAME",
      billingInformation: {
        companyName: "COMPANY",
        name: "BILL ACCOUNT NAME",
        phone: "1234567890",
        email: "account1@account1.com",
        address: "California 54-66",
        zipCode: "33020",
        city: "Florida",
        country: "USA",
        state: "FL",
      },
      contactInformation: {
        name: "ALEXANDER IBAI",
        phone: "1234567890",
        email: "alexander@account1.com",
      },
      active: true
    };
    const token = await databaseConnection();

    await api
      .post("/api/v1/account")
      .send(newAccount)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(400);
  });

  test("Endpoint - Create Account - If account billingInformation is not send in the request, should return a status code 400", async () => {
    const newAccount = {
      name: "ACCOUNT NAME 3",
      description: "EXAMPLE DESCRIPTION",
      contactInformation: {
        name: "ALEXANDER IBAI",
        phone: "1234567890",
        email: "alexander@account1.com",
      },
      active: true
    };
    const token = await databaseConnection();

    await api
      .post("/api/v1/account")
      .send(newAccount)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(400);
  });

  test("Endpoint - Create Account - If account contactInformation is not send in the request, should return a status code 400", async () => {
    const newAccount = {
      name: "ACCOUNT NAME",
      description: "EXAMPLE DESCRIPTION",
      billingInformation: {
        companyName: "COMPANY",
        name: "BILL ACCOUNT NAME",
        phone: "1234567890",
        email: "account1@account1.com",
        address: "California 54-66",
        zipCode: "33020",
        city: "Florida",
        country: "USA",
        state: "FL",
      },
      active: true
    };

    const token = await databaseConnection();

    await api
      .post("/api/v1/account")
      .send(newAccount)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(400);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
