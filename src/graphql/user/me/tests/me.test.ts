import { Connection } from 'typeorm';
import { createMyConnection } from '../../../../utils';
import { User } from '../../../../entities';
import { user1 } from '../../../../constants';
import noCookie from './noCookie';
import loginAndQueryMe from './loginAndQueryMe';

let connection: Connection;

beforeAll(async () => {
  connection = await createMyConnection();
  const user = User.create({ ...user1, ...{ confirmedEmail: 1 } });
  await user.save();
});

describe(
  'me',
  async () => {
    it('no cookie', noCookie);
    it('login and query me', loginAndQueryMe)
  }
);

afterAll(async () => {
  if (connection) {
    connection.close();
  }
});