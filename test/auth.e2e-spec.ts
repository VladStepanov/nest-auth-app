import 'dotenv/config';
import { createConnection, getConnection } from 'typeorm';
import { loginDTO, registerDTO } from '../src/auth/auth.dto';
import * as request from 'supertest';
import { appHost } from './constants';

describe('AUTH', () => {
  beforeEach(async () => {
    // We do it for drop table
    await createConnection(require('../ormconfig.js'));
  });

  afterEach(async () => {
    await getConnection().close();
  });

  const userReg: registerDTO = {
    username: 'forTests',
    password: 'password',
    adress: 'Some adress',
    city: 'Some city',
    state: 'Some state',
  };
  const userLogin: loginDTO = {
    username: userReg.username,
    password: userReg.password,
  };

  it('should register user', () => {
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
  it('should login', async () => {
    await request(appHost).post('/auth/register').send(userReg);
    return request(appHost)
      .post('/auth/login')
      .send(userLogin)
      .expect(({ status, body: { accessToken } }) => {
        expect(status).toBe(201);
        expect(accessToken).toBeDefined();
      });
  });
  it('should give an access to guarded route', async () => {
    const { body: { accessToken } } = await request(appHost).post('/auth/register').send(userReg);
    return request(appHost)
      .get('/auth')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(({ status }) => {
        expect(status).toBe(200);
      });
  });
  it('should reject if user unauthorized', async () => {
    return request(appHost)
      .get('/auth')
      .expect(({ status }) => {
        expect(status).toBe(401);
      });
  });
});
