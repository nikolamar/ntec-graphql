import { user1 } from '../../../../constants';
import { TestClient } from '../../../../utils';

export default async () => {
  const session1 = new TestClient(process.env.TEST_HOST as string);
  await session1.login(user1.email, user1.password);
  const session2 = new TestClient(process.env.TEST_HOST as string);
  await session2.login(user1.email, user1.password);
  expect(await session1.me()).toEqual(await session2.me());
  await session1.logout();
  expect(await session1.me()).toEqual(await session2.me());
}