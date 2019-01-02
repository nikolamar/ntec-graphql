import { Redis } from 'ioredis';
import { Session } from '../interfaces/Session';

export interface Context {
  redis: Redis;
  host: string;
  session: Session;
  request: Express.Request;
}