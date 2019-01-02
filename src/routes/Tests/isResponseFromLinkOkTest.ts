import { test } from './confirmEmail.test'
import * as rp from 'request-promise';

export default async () => {
  const response: any = await rp.get(test.link);
  expect(response).toEqual('ok');
}