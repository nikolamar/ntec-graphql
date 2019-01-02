import { Strategy } from 'passport-google-oauth2';
import onGoogleSuccess from './onGoogleSuccess';

export default new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: 'http://localhost:4000/auth/google/callback',
    scope: ['https://www.googleapis.com/auth/userinfo.email']
  },
  onGoogleSuccess
)