import { Connection } from 'typeorm';
import { createMyConnection } from '../../../../utils';
import { User } from '../../../../entities';
import { user1 } from '../../../../constants';
import multipleSession from './multipleSession';
import singleSession from './singleSession';

export let user: any;
let connection: Connection;

beforeAll(async () => {
  connection = await createMyConnection();
  user = User.create({ ...user1, ...{ confirmedEmail: 1 } });
  await user.save();
});

describe(
  'logout',
  async () => {
    it('multiple session', multipleSession);
    it('single session', singleSession);
  }
);

afterAll(async () => {
  if (connection) {
    connection.close();
  }
});