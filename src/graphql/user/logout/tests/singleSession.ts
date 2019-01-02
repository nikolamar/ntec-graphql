import { user1 } from '../../../../constants';
import { user } from './logout.test'
import { TestClient } from '../../../../utils';

export default async () => {
  const client = new TestClient(process.env.TEST_HOST as string);
  await client.login(user1.email, user1.password);
  const response1 = await client.me();
  expect(response1.data).toEqual({
    me: {
      id: user.id,
      email: user1.email
    }
  });
  await client.logout();
  const response2 = await client.me();
  expect(response2.data.me).toBeNull();
}