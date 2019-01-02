import { Redis } from 'ioredis';
import { v4 } from 'uuid';
import { forgotPasswordPrefix } from '../constants/prefix';

export function createForgotPasswordLink(host: string, userId: string, redis: Redis) {
  const id = v4();
  redis.set(`${forgotPasswordPrefix}${id}`, userId, 'ex', 60 * 20); // 20 minutes
  return `${host}/change-password/${id}`;
}