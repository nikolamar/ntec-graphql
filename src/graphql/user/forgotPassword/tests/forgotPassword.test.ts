import * as Redis from 'ioredis';
import { Connection } from 'typeorm';
import { createMyConnection } from '../../../../utils';
import { User } from '../../../../entities';
import { user1 } from '../../../../constants';
import forgotPasswordPipeline from './forgotPasswordPipeline'

export let redis: Redis.Redis;
export let user: any;
export const newPassword = 'newpassword';
let connection: Connection;

beforeAll(async () => {
  redis = new Redis();
  connection = await createMyConnection();
  user = User.create({ ...user1, ...{ confirmedEmail: 1 } });
  await user.save();
});

describe(
  'forgot password',
  async () => {
    it('forgot password pipeline', forgotPasswordPipeline);
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