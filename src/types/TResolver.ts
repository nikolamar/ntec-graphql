import { Context } from '../interfaces';

export type TResolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;