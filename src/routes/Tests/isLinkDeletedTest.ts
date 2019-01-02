import { test, redis } from './confirmEmail.test'

const host = process.env.TEST_HOST as string;

export default async () => {
  const redisKey = test.link.replace(`${host}/confirm/`, '');
  const redisVal = await redis.get(redisKey);
  expect(redisVal).not.toBeUndefined();
}