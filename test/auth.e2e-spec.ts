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
    // const connection: Connection = await createConnection(require('../ormconfig.js'));
    // const userRepository = connection.getRepository(UserEntity);
    // await userRepository.query(`DELETE FROM user_entity;`);
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
});
