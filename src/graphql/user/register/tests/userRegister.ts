import { User } from '../../../../entities';
import { user1 } from '../../../../constants';
import { TestClient } from '../../../../utils';

export default async () => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const response = await client.register(user1.firstName, user1.lastName, user1.phone, user1.email, user1.password);
  expect(response.data).toEqual({ register: null });
  const users = await User.find({ where: { email: user1.email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(user1.email);
  expect(user.password).not.toEqual(user1.password);
}