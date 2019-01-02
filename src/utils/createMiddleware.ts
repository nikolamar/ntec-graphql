import { TResolver, TGraphQlMiddlewareFunc } from '../types';

export const createMiddleware = (
  middlewareFunc: TGraphQlMiddlewareFunc,
  resolverFunc: TResolver
) => (
  parent: any, args: any, context: any, info: any
) =>
    middlewareFunc(resolverFunc, parent, args, context, info);