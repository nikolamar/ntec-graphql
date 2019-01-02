import * as passport from 'passport';
import twitterStrategy from './twitterStrategy';
import facebookStrategy from './facebookStrategy';
import googleStrategy from './googleStrategy';

passport.use(twitterStrategy);
passport.use(facebookStrategy);
passport.use(googleStrategy);

export default passport;