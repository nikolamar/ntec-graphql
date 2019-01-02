import { user1 } from '../../../../constants';
import { TestClient } from '../../../../utils';

export default async () => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const response = await client.register(user1.firstName, user1.lastName, user1.phone, 'a', user1.password);
  expect(response.data.register).toHaveLength(2);
  expect(response.data.register[0].path).toEqual('email');
  expect(response.data.register[1].path).toEqual('email');
  expect(response.data).toEqual({
    register: [{
      path: 'email',
      message: 'email must be at least 3 characters'
    },
    {
      path: 'email',
      message: 'email must be a valid email'
    }]
  });
}