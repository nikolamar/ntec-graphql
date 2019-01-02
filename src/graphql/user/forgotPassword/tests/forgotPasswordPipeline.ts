import {
  user1,
  validationLockedAccount,
  validationLoginPasswordLength,
  validationPasswordAlreadyChanged
} from '../../../../constants';
import { TestClient } from '../../../../utils';
import { createForgotPasswordLink } from '../../../../utils/createForgotPasswordLink';
import { user, redis, newPassword } from './forgotPassword.test';
import { forgotPasswordLockAccount } from '../../../../utils/forgotPasswordLockAccount';

export default async () => {
  const client = new TestClient(process.env.TEST_HOST as string);

  // lock account
  await forgotPasswordLockAccount(user.id, redis);
  const url = await createForgotPasswordLink('', user.id, redis);
  const parts = url.split('/');
  const key = parts[parts.length - 1];

  // make sure you can't login when account is locked
  const response = await client.login(user1.email, user1.password);
  expect(response.data).toEqual({
    login: [{
      path: 'email',
      message: validationLockedAccount
    }]
  });

  // try changing to password that is too short
  const response1 = await client.forgotPasswordChange('a', key);
  expect(response1.data).toEqual({
    forgotPasswordChange: [{
      path: 'password',
      message: validationLoginPasswordLength
    }]
  });

  // successfuly change password
  const response2 = await client.forgotPasswordChange(newPassword, key);
  expect(response2.data).toEqual({
    forgotPasswordChange: null
  });

  // make sure redis expire after password change
  const response3 = await client.forgotPasswordChange(newPassword, key);
  expect(response3.data).toEqual({
    forgotPasswordChange: [{
      path: 'password',
      message: validationPasswordAlreadyChanged
    }]
  });

  // account should be unlocked
  const response4 = await client.login(user.email, newPassword);
  expect(response4.data).toEqual({
    login: null
  });
}