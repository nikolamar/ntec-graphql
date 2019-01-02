import { user1 } from '../../../../constants';
import { TestClient } from '../../../../utils';

export default async function loginAndQueryMe() {
  const client = new TestClient(process.env.TEST_HOST as string);
  await client.login(user1.email, user1.password);
  const response = await client.me();
  expect(response.data.me.email).toEqual(user1.email);
}