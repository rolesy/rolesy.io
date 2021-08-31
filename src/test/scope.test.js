import mongoose from 'mongoose';
import supertest from 'supertest';
import serverConfig from '../app';
import Mongo from '../db/mongo';
import env from '../configs';
import { getDatabaseUrlMongo } from '../utils/libs/utils';

const api = supertest(serverConfig.app);
const mongoDb = new Mongo(getDatabaseUrlMongo(env.ENVIRONMENT || 'DEVELOPMENT'));

describe('Component - scope', () => {
  test('Endpoint - Create Scope - If there is not bearer token should return status code 401', async () => {
    const newScope = {
      name: 'CREATE_ACCOUNT',
      description: 'Allow account creation proccess',
      module: '',
      active: true,
    };

    await mongoDb.connectMongoDB();

    await api.post('/api/v1/scope').send(newScope)
      .expect('Content-Type', /application\/json/)
      .expect(401);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
