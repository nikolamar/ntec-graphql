import { Connection } from 'typeorm';
import { User } from '../../../../entities';
import { user3, validationLoginNoUser } from '../../../../constants';
import { validationLoginConfirmEmail, validationLoginPassword } from '../../../../constants/validationMessages';
import { createMyConnection, TestClient } from '../../../../utils';

let client: TestClient;
let connection: Connection;

beforeAll(async () => {
  connection = await createMyConnection();
});

describe(
  'login',
  async () => {
    it(
      'user not found',
      async () => {
        client = new TestClient(process.env.TEST_HOST as string);
        const response = await client.login(user3.email, user3.password)
        expect(response.data).toEqual({
          login: [
            {
              path: 'email',
              message: validationLoginNoUser
            }
          ]
        });
      }
    );
    it(
      'email not confirmed',
      async () => {
        await client.register(user3.firstName, user3.lastName, user3.phone, user3.email, user3.password);
        const response = await client.login(user3.email, user3.password);
        expect(response.data).toEqual({
          login: [
            {
              path: 'email',
              message: validationLoginConfirmEmail
            }
          ]
        });
      }
    );
    it(
      'invalid password',
      async () => {
        await User.update({ email: user3.email }, { confirmedEmail: 1 });
        const response = await client.login(user3.email, 'wrong password');
        expect(response.data).toEqual({
          login: [
            {
              path: 'password',
              message: validationLoginPassword
            }
          ]
        });
      }
    );
    it(
      'user logged in',
      async () => {
        const response = await client.login(user3.email, user3.password);
        expect(response.data).toEqual({ login: null });
      }
    );
  }
);

afterAll(async () => {
  if (connection) {
    connection.close();
  }
});