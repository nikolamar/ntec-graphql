import { Strategy } from 'passport-twitter';
import onTwitterSuccess from './onTwitterSuccess';

export default new Strategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
    callbackURL: 'http://localhost:4000/auth/twitter/callback',
    includeEmail: true
  },
  onTwitterSuccess
);