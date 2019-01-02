// import { logger } from '../../utils';
import { TResolver } from '../../../types';
// import { User } from '../../entities/User';

export default async (resolver: TResolver, parent: any, args: any, context: any, info: any) => {
  // export default async (resolver: TResolver, ...params: any[]) => {
  // logger(params);

  // const args = params[1];
  // const context = params[2];
  // const info = params[3];

  // check has user session
  if (!context.session || !context.session.userId) {
    return;
  }

  // check is user admin
  // const user: any = await User.findOne({ where: { id: context.session.userId } });
  // if (!user || !user.admin) {
  //   throw Error('Not admin sorry');
  // }

  // middleware
  const result = await resolver(parent, args, context, info);
  // afterwards
  return result;
}