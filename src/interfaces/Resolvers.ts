import { TResolver } from '../types';

export interface Resolvers {
  [key: string]: {
    [key: string]: TResolver
  };
}