import { removeUserSessions } from '../../../utils';
import { Resolvers } from '../../../interfaces';

export const resolvers: Resolvers = {
  Mutation: {
    logout: async (_, __, { session, redis }) => {
      const { userId } = session;
      if (userId) {
        await removeUserSessions(userId, redis);
        return true;
      }
      return false;
    }
  }
};