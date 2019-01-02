import * as yup from 'yup';
import {
  validationRegisterEmail,
  validationRegisterPhone,
  validationLoginPasswordLength
} from '../../../constants';
import { Resolvers } from '../../../interfaces';
import { User } from '../../../entities';
import {
  formatYupError,
  createConfirmEmailLink,
  sendConfirmationEmail
} from '../../../utils';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
  firstName: yup.string().min(1).max(20),
  lastName: yup.string().min(1).max(20),
  phone: yup.string().matches(phoneRegExp, validationRegisterPhone).max(20),
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3, validationLoginPasswordLength).max(255),
});

export const resolvers: Resolvers = {
  Mutation: {
    async register(_, args, context) {

      try {
        await schema.validate(args, { abortEarly: false })
      } catch (err) {
        return formatYupError(err);
      }

      const { firstName, lastName, phone, email, password } = args;

      const userAlreadyExists = await User.findOne({ where: { email }, select: ['id'] });

      if (userAlreadyExists) {
        return [
          {
            path: 'email',
            message: validationRegisterEmail
          }
        ];
      }

      const user = User.create({
        firstName,
        lastName,
        phone,
        email,
        password,
      });

      await user.save();

      const { host, redis } = context;

      if (process.env.NODE_ENV !== 'test') {
        const link = await createConfirmEmailLink(host, user.id, redis);
        await sendConfirmationEmail(email, link);
      }

      return;
    }
  }
};