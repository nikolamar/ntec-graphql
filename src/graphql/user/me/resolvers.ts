import { Resolvers } from '../../../interfaces';
import { User } from '../../../entities';
import { createMiddleware } from '../../../utils/createMiddleware';
import middleware from './middleware';

export const resolvers: Resolvers = {
  Query: {
    me: createMiddleware(
      middleware,
      (_, __, { session }) => {
        return User.findOne({ where: { id: session.userId } });
      }
    )
  }
};