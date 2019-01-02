import { user1 } from '../../../../constants';
import { TestClient } from '../../../../utils';

export default async () => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const response = await client.register(user1.firstName, '', user1.phone, user1.email, user1.password);
  expect(response.data.register).toHaveLength(1);
  expect(response.data.register[0].path).toEqual('lastName');
  expect(response.data.register[0].path).toEqual('lastName');
  expect(response.data).toEqual({
    register: [{
      path: 'lastName',
      message: 'lastName must be at least 1 characters'
    }]
  });
}