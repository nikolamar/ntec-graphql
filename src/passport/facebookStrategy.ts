import { Strategy } from 'passport-facebook';
import onFacebookSuccess from './onFacebookSuccess';

export default new Strategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    enableProof: false,
    callbackURL: 'http://localhost:4000/auth/facebook/callback'
  },
  onFacebookSuccess
)