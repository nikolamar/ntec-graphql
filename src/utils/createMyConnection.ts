import { getConnectionOptions, createConnection } from 'typeorm';

export const createMyConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  const options = { ...connectionOptions, name: 'default'};
  return createConnection(options);
}