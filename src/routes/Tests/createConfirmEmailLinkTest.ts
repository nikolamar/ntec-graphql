import { test, redis } from './confirmEmail.test'
import { createConfirmEmailLink } from '../../utils';

const host = process.env.TEST_HOST as string;

export default async () => {
  test.link = createConfirmEmailLink(host, test.userId, redis);
  const redisKey = test.link.replace(`${host}/confirm/`, '');
  const redisVal = await redis.get(redisKey);
  expect(redisVal).not.toBeNull();
}