import { TestClient } from '../../../../utils';
import { user1 } from '../../../../constants';

export default async () => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const response = await client.login(user1.email, user1.password);
  expect(response.data.me && response.data.me.email).toBeUndefined();
}