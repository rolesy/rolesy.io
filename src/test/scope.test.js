import mongoose from 'mongoose';
import supertest from 'supertest';
import serverConfig from '../app';
import Mongo from '../db/mongo';
import env from '../configs';
import { getDatabaseUrlMongo } from '../utils/libs/utils';

const api = supertest(serverConfig.app);
const mongoDb = new Mongo(
  getDatabaseUrlMongo(env.ENVIRONMENT || 'DEVELOPMENT'),
);

describe('Component - scope', () => {
  test('Endpoint - Create Scope - If there is not bearer token should return status code 401', async () => {
    const newScope = {
      name: 'CREATE_ACCOUNT',
      description: 'Allow account creation proccess',
      module: 'ACCOUNTS',
      active: true,
    };

    await mongoDb.connectMongoDB();

    await api
      .post('/api/v1/scope')
      .send(newScope)
      .expect('Content-Type', /application\/json/)
      .expect(401);
  }, 25000);

  test('Endpoint - Create Scope - If scope name is send in lowercase, should return a status code 400', async () => {
    const newScope = {
      name: 'create_account',
      description: 'Allow account creation proccess',
      module: 'ACCOUNTS',
      active: true,
    };

    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .post('/api/v1/scope')
      .send(newScope)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  });

  test('Endpoint - Create Scope - If scope name is not send in the request, should return a status code 400', async () => {
    const newScope = {
      description: 'Allow account creation proccess',
      module: 'ACCOUNTS',
      active: true,
    };

    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .post('/api/v1/scope')
      .send(newScope)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  });

  test('Endpoint - Create Scope - If scope description is not send in the request, should return a status code 400', async () => {
    const newScope = {
      name: 'CREATE_ACCOUNT',
      module: 'ACCOUNTS',
      active: true,
    };

    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .post('/api/v1/scope')
      .send(newScope)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  });

  test('Endpoint - Create Scope - If scope description has more that 200 characters in the request, should return a status code 400', async () => {
    const newScope = {
      name: 'CREATE_ACCOUNT',
      description:
        `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of 
        classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, 
        consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, 
        discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise 
        on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum 
        dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since 
        the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum 
        et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions 
        from the 1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. 
        It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard 
        McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure 
        Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical 
        literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de 
        Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a 
        treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 
        "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum 
        used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de 
        Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by 
        English versions from the 1914 translation by H. Rackham.`,
      module: 'ACCOUNTS',
      active: true,
    };

    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .post('/api/v1/scope')
      .send(newScope)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  });

  test('Endpoint - Create Scope - If scope module is different to ACCOUNT or USERS, should return a status code 400', async () => {
    const newScope = {
      name: 'CREATE_ACCOUNT',
      description: 'Scope description',
      module: 'TEST',
      active: true,
    };

    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .post('/api/v1/scope')
      .send(newScope)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
