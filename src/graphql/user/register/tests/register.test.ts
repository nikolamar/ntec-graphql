import { Connection } from 'typeorm';
import { createMyConnection } from '../../../../utils';
import userRegister from './userRegister';
import duplicateUser from './duplicateUser';
import badEmail from './badEmail';
import badPassword from './badPassword';
import badPhoned from './badPhone';
import badFirstName from './badFirstName';
import badLastName from './badLastName';

let connection: Connection;

beforeAll(async () => {
  connection = await createMyConnection();
});

describe(
  'register',
  async () => {
    it('user register', userRegister);
    it('duplicate user', duplicateUser);
    it('bad email', badEmail);
    it('bad password', badPassword);
    it('bad phone', badPhoned);
    it('bad firstName', badFirstName);
    it('bad lastName', badLastName);
  }
);

afterAll(async () => {
  if (connection) {
    connection.close();
  }
});