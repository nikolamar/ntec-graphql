import * as yup from 'yup';
import { Resolvers } from '../../../interfaces';
import { User } from '../../../entities';
import {
  validationUserEmail,
  validationLoginPasswordLength,
  forgotPasswordPrefix,
  validationPasswordAlreadyChanged
} from '../../../constants';
import {
  forgotPasswordLockAccount,
  createForgotPasswordLink,
  formatYupError
} from '../../../utils';
import * as bcrypt from 'bcryptjs';

const schema = yup.object().shape({
  password: yup.string().min(3, validationLoginPasswordLength).max(255),
});

export const resolvers: Resolvers = {
  Mutation: {
    async sendForgotPasswordEmail(_, { email }, { redis }) {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return [{
          path: 'email',
          message: validationUserEmail
        }];
      }

      await forgotPasswordLockAccount(user.id, redis);
      // @todo: add real url from frontend
      await createForgotPasswordLink('', user.id, redis);
      // @todo: send email with url
      return true;
    },
    async forgotPasswordChange(_, { newPassword, key }, { redis }) {

      // getting userId based on redis key
      const userId = await redis.get(`${forgotPasswordPrefix}${key}`);
      const user = await User.findOne({ where: { id: userId } });

      // if link is deleted
      if (!user) {
        return [{
          path: 'password',
          message: validationPasswordAlreadyChanged
        }];
      }

      // check is password too short
      try {
        await schema.validate({ password: newPassword }, { abortEarly: false })
      } catch (err) {
        return formatYupError(err);
      }

      // deleting link
      await redis.del(`${forgotPasswordPrefix}${key}`);

      // unlocking account
      // changing password
      if (userId) {
        await User.update({ id: userId }, {
          password: await bcrypt.hash(newPassword, 10),
          forgotPasswordLocked: 0
        });
      }

      return;
    },
  },
};