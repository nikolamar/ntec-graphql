import {
  validationLoginNoUser,
  validationLoginConfirmEmail,
  validationLoginPassword,
  validationLockedAccount,
  userSessionIdPrefix,
} from '../../../constants';
import { Resolvers } from '../../../interfaces';
import { User } from '../../../entities';
import * as bcrypt from 'bcryptjs';

export const resolvers: Resolvers = {
  Mutation: {
    async login(_, { email, password }, { session, redis, request }) {

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return [{
          path: 'email',
          message: validationLoginNoUser
        }];
      }

      if (!user.confirmedEmail) {
        return [{
          path: 'email',
          message: validationLoginConfirmEmail
        }];
      }

      if (user.forgotPasswordLocked) {
        return [{
          path: 'email',
          message: validationLockedAccount
        }];
      }

      let valid;

      if (user.password) {
        valid = await bcrypt.compare(password, user.password);
      }

      if (!valid) {
        return [{
          path: 'password',
          message: validationLoginPassword
        }];
      }

      // creating a cookie
      session.userId = user.id;

      if (request.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${user.id}`, request.sessionID);
      }

      return;
    }
  }
};