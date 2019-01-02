import { User } from '../../entities';
import server from '../../server';

export const confirmEmail = async (req: any, res: any) => {
  const redis = server.redis;
  const { id } = req.params;
  const userId: any = await redis.get(id);
  if (!userId) {
    res.send('invalid');
    return;
  }
  await User.update({ id: userId }, { confirmedEmail: 1 });
  redis.del(id);
  res.send('ok');
};