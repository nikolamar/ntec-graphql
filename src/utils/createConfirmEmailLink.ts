import { Redis } from 'ioredis';
import { v4 } from 'uuid';

export function createConfirmEmailLink(host: string, userId: string, redis: Redis) {
  const id = v4();
  redis.set(id, userId, 'ex', 60 * 60 * 24); // 24 hours
  return `${host}/confirm/${id}`;
}