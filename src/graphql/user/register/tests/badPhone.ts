import { user1, validationRegisterPhone } from '../../../../constants';
import { TestClient } from '../../../../utils';

export default async () => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const response = await client.register(user1.firstName, user1.lastName, 'a', user1.email, user1.password);
  expect(response.data.register).toHaveLength(1);
  expect(response.data.register[0].path).toEqual('phone');
  expect(response.data).toEqual({
    register: [{
      path: 'phone',
      message: validationRegisterPhone
    }]
  });
}