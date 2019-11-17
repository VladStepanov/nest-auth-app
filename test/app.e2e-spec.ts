import 'dotenv/config';
import * as request from 'supertest';
import { appHost } from './constants';

describe('ROOT', () => {
  it('should ping', () => {
    return request(appHost)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
