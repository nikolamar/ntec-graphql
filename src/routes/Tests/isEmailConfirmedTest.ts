import { User } from '../../entities/User';
import { test } from './confirmEmail.test'

export default async () => {
  const user: any = await User.findOne({ where: { id: test.userId } });
  expect(user.confirmedEmail).toEqual(1);
}