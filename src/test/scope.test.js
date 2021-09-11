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

describe('Create Scope', () => {
  test('If there is not bearer token should return status code 401', async () => {
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

  test('If scope name is send in lowercase, should return a status code 400', async () => {
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

  test('If scope name is not send in the request, should return a status code 400', async () => {
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

  test('If scope description is not send in the request, should return a status code 400', async () => {
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

  test('If scope description has more that 200 characters in the request, should return a status code 400', async () => {
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

  test('If scope module is different to ACCOUNT or USERS, should return a status code 400', async () => {
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

describe('Get Scope by ID', () => {
  test('If there is not bearer token should return status code 401', async () => {
    await mongoDb.connectMongoDB();

    await api
      .get('/api/v1/scope/61364d7f79978644195b1926')
      .expect('Content-Type', /application\/json/)
      .expect(401);
  }, 25000);

  test('If there is not sent an ID should return a status code 400', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .get('/api/v1/scope')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  });

  test('If the ID sent in the request is not a valid Object ID format', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .get('/api/v1/scope/TEST_ID_SENT')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  });

  test('If the ID has a correct format but there is any scope saved with that ID should return a 400', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    const response = await api
      .get('/api/v1/scope/61364d7f79978644195b1927')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body)
      .toEqual(expect.objectContaining({
        error: expect.any(Boolean),
        message: expect.any(String),
      }));
  });

  test('If there is a valid ID and find a document should return the document and a status 200', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    const response = await api
      .get('/api/v1/scope/61364d7f79978644195b1926')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(expect.objectContaining({
      active: expect.any(Boolean),
      _id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
    }));
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});

describe('Get Scopes', () => {
  test('If there is not bearer token should return status code 401', async () => {
    await mongoDb.connectMongoDB();

    await api
      .get('/api/v1/scope?page=0&limit=2')
      .expect('Content-Type', /application\/json/)
      .expect(401);
  }, 20000);

  test('If there is not sent a page value should return status code 400', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .get('/api/v1/scope?limit=2')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  }, 20000);

  test('If page is not a number integer positive greater than zero (0) should return status code 400', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .get('/api/v1/scope?page=-1&limit=2')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  }, 20000);

  test('If there is not sent limit value should return status code 400', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .get('/api/v1/scope?page=-1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  }, 20000);

  test('If limit value is not a number integer positive greater or equal to 1 should return status code 400', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .get('/api/v1/scope?page=0&limit=0')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  }, 20000);

  test('If there is sent the module filter with a value different to ACCOUNTS or USERS should return status code 400', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .get('/api/v1/scope?page=0&limit=10&module=TEST')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(400);
  }, 20000);

  test('If everything goes well should return status code 200', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    await api
      .get('/api/v1/scope?page=0&limit=10&module=ACCOUNTS')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .expect(200);
  }, 20000);

  test('If everything goes well the body must containe a property scopes that is an array and other records that is a number', async () => {
    const credentials = {
      username: 'user-tests',
      password: 'Usertests123*',
    };

    await mongoDb.connectMongoDB();

    const responseLogin = await api.post('/api/v1/authentication/login').send(credentials);
    const { token } = responseLogin.body.data;

    const response = await api
      .get('/api/v1/scope?page=0&limit=10&module=ACCOUNTS')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.data).toEqual(expect.objectContaining({
      scopes: expect.any(Array),
      records: expect.any(Number),
    }));
  }, 20000);

  afterAll(() => {
    mongoose.connection.close();
  });
});
