import { User } from '../entities';
import Server from '../server';

export default async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
  console.log('onTwitterSuccess', accessToken, refreshToken, profile, cb);

  const { id, emails } = profile;

  const query = await Server.ormConnection
    .getRepository(User)
    .createQueryBuilder('user')
    .where('user.twitterId = :id', { id });

  let email = null;

  if (emails) {
    email = emails[0].value;
    query.orWhere('user.email = :email', { email });
  }

  let user = await query.getOne();

  // this is new user
  if (!user) {
    user = await User.create({
      twitterId: id,
      email
    }).save();
  }

  // user exist merge account
  else if (!user.twitterId) {
    user.twitterId = id;
    await user.save();
  }

  // we have a twitter id

  // callback error, passing parameter
  return cb(null, { id: user.id });
}