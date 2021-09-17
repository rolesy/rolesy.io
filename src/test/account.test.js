import mongoose from "mongoose";
import supertest from "supertest";
import serverConfig from "../app";
import Mongo from "../db/mongo";
import env from "../configs";
import { getDatabaseUrlMongo } from "../utils/libs/utils";
import { response } from "express";

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

describe("Create - account", () => {
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
      active: true,
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
      active: true,
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
      active: true,
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
      active: true,
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

describe("Get Account by ID", () => {
  test("If there is not bearer token should return status code 401", async () => {
    await mongoDB.connectMongoDB();

    await api
      .get("/api/v1/account/613811dbae8adc538c0c2b24")
      .expect("Content-Type", /application\/json/)
      .expect(401);
  }, 25000);

  test("If there is not sent an ID should return a status code 400", async () => {
    const token = await databaseConnection();

    await api
      .get("/api/v1/account")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(404);
  });

  test("If the ID sent in the request is not a valid Object ID format", async () => {
    const token = await databaseConnection();

    await api
      .get("/api/v1/account/test_id")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(400);
  });
  test("If the ID has a correct format but there is any scope saved with that ID should return a 400", async () => {
    const token = await databaseConnection();

    const response = await api
      .get("/api/v1/account/613811dbae8adc538c0c2b21")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        message: expect.any(String),
      })
    );
  });

  test("If there is a valid ID and find a document should return the document and a status 200", async () => {
    const token = await databaseConnection();

    const response = await api
      .get("/api/v1/account/613811dbae8adc538c0c2b24")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);

    expect(response.body.data).toEqual(
      expect.objectContaining({
        active: expect.any(Boolean),
        _id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        billingInformation: expect.any(Object),
        contactInformation: expect.any(Object),
      })
    );
  });
});

describe("Get Account list", () => {
  test("If there is not bearer token should return status code 401", async () => {
    await mongoDB.connectMongoDB();

    await api
      .get("/api/v1/account/list")
      .expect("Content-Type", /application\/json/)
      .expect(401);
  }, 25000);

  test("If there is not sent a page value should return status code 400", async () => {
    const token = await databaseConnection();

    await api
      .get("/api/v1/account/list")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(400);
  }, 20000);

  test("If page is not a number integer positive grater than zero (0) should status code 400", async () => {
    const token = await databaseConnection();

    await api
      .get("/api/v1/account/list?page=-1&limit=2")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(400);
  }, 20000);

  test("If there is not sent limit value should return status code 400", async () => {
    const token = await databaseConnection();

    await api
      .get("/api/v1/account/list?page=1")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(400);
  }, 20000);

  test("If limit value is not a number integer positive grater or equal to 1 should return status code 400", async () => {
    const token = await databaseConnection();

    await api
      .get("/api/v1/account/list?page=1&limit=0")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(400);
  }, 20000);

  test("If everything goes well should return status code 200", async () => {
    const token = await databaseConnection();

    await api
      .get("/api/v1/account/list?page=1&limit=10")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(200);
  }, 20000);

  test("If everything goes well the body must containe a property accounts that is an array and other records that is a number", async () => {
    const token = await databaseConnection();

    const response = await api
      .get("/api/v1/account/list?page=1&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.data).toEqual(
      expect.objectContaining({
        accounts: expect.any(Array),
        records: expect.any(Number),
      })
    );
  }, 20000);

  afterAll(() => {
    mongoose.connection.close();
  });
});
