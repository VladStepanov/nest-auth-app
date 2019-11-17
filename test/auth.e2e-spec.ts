import 'dotenv/config';
import { Connection, createConnection, getConnection } from 'typeorm';
import { registerDTO } from '../src/auth/auth.dto';
import * as request from 'supertest';
import { appHost } from './constants';
import { UserEntity } from '../src/entities/user.entity';

describe('AUTH', () => {
  beforeEach(async () => {
    // We do it for drop table
    await createConnection(require('../ormconfig.js'));
  });

  afterEach(async () => {
    await getConnection().close();
  });

  const user: registerDTO = {
    username: 'forTest1',
    password: 'pass1',
    adress: 'adress',
    city: 'city',
    state: 'state',
  };

  it ('should register user', () => {
    return request(appHost)
      .post('/auth/register')
      .send(user)
      .expect(({ status, body: { accessToken } }) => {
        expect(status).toBe(201);
        expect(accessToken).toBeDefined();
      });
  });
  it('should reject registration if user exists', async () => {
    await request(appHost).post('/auth/register').send(user);
    return request(appHost)
      .post('/auth/register')
      .send(user)
      .expect(({ status }) => {
        expect(status).toBe(400);
      });
  });
  it ('should login', async () => {
    return request(appHost)
      .post('/auth/register')
      .send(user)
      .expect(({ body: { accessToken }, status }) => {
        expect(accessToken).toBeDefined();
        expect(status).toBe(201);
      });
  });
});
