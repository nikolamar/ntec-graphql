import { Redis } from 'ioredis';
import { removeUserSessions } from '.';
import { User } from '../entities';

export const forgotPasswordLockAccount = async (userId: string, redis: Redis) => {
  // can't login
  await User.update({ id: userId }, { forgotPasswordLocked: 1 });
  // remove all sessions
  removeUserSessions(userId, redis);
}