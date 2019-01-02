import { TResolver } from ".";
import { Context } from "../interfaces";

export type TGraphQlMiddlewareFunc = (
  resolver: TResolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;