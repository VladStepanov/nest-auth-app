import 'dotenv/config';
import { Connection, createConnection, getConnection } from 'typeorm';
import { loginDTO, registerDTO } from '../src/auth/auth.dto';
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

  const userReg: registerDTO = {
    username: 'forTest1',
    password: 'pass1',
    adress: 'adress',
    city: 'city',
    state: 'state',
  };
  const userLogin: loginDTO = {
    username: userReg.username,
    password: userReg.password,
  };

  it ('should register user', () => {
    return request(appHost)
      .post('/auth/register')
      .send(userReg)
      .expect(({ status, body: { accessToken } }) => {
        expect(status).toBe(201);
        expect(accessToken).toBeDefined();
      });
  });
  it('should reject registration if user exists', async () => {
    await request(appHost).post('/auth/register').send(userReg);
    return request(appHost)
      .post('/auth/register')
      .send(userReg)
      .expect(({ status }) => {
        expect(status).toBe(400);
      });
  });
  it ('should login', async () => {
    await request(appHost).post('/auth/register').send(userReg);
    return request(appHost)
      .post('/auth/login')
      .send(userLogin)
      .expect(({ body: { accessToken }, status }) => {
          expect(status).toBe(201);
          expect(accessToken).toBeDefined();
      });
  });
});
