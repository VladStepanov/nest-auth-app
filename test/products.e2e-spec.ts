import 'dotenv/config';
import { createConnection, getConnection } from 'typeorm';
import { loginDTO, registerDTO } from '../src/auth/auth.dto';
import * as request from 'supertest';
import { appHost } from './constants';
import { ProductDto } from 'src/products/product.dto';

describe('AUTH', () => {
  beforeEach(async () => {
    // We do it for drop table
    await createConnection(require('../ormconfig.js'));
    const { body: { accessToken } } = await request(appHost)
      .post('/auth/register')
      .send(userReg);
    token = accessToken;
  });

  afterEach(async () => {
    await getConnection().close();
  });

  let token = null

  const userReg: registerDTO = {
    username: 'forTests',
    password: 'password',
    adress: 'some adress',
    city: 'some city',
    state: 'some state',
  };
  const product: ProductDto = {
    title: 'Product for tests',
    desc: 'Testing products',
    price: 10
  }

  it('should register product', async () => {
    return request(appHost)
      .post('/products')
      .send(product)
      .set('Authorization', `Bearer ${token}`)
      .expect(({ status, body }) => {
        expect(status).toBe(201);
        for (let key in product) {
          expect(body[key]).toBe(product[key]);
        }
      });
  });
});
