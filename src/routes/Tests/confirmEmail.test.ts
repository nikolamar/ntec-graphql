import * as Redis from 'ioredis';
import { Connection } from 'typeorm';
import { createMyConnection } from '../../utils';
import { user4 } from '../../constants';
import { User } from '../../entities';
import createConfirmEmailLinkTest from './createConfirmEmailLinkTest';
import isResponseFromLinkOkTest from './isResponseFromLinkOkTest';
import isEmailConfirmedTest from './isEmailConfirmedTest';
import isLinkDeletedTest from './isLinkDeletedTest';

export let test = { link: '', userId: '' };
export let redis: Redis.Redis;

let connection: Connection;

beforeAll(async () => {
  redis = new Redis();
  connection = await createMyConnection();
  const user = await User.create(user4).save();
  test.userId = user.id;
});

describe(
  'Make sure confirmation link works',
  async () => {
    it('create confirm email link', createConfirmEmailLinkTest);
    it('is response from link ok', isResponseFromLinkOkTest);
    it('is email confirmed', isEmailConfirmedTest);
    it('is link deleted', isLinkDeletedTest)
  }
);

afterAll(async () => {
  if (redis) {
    redis.disconnect();
  }
  if (connection) {
    connection.close();
  }
});