import server from '../src/server';

export default async function () {
  await server.createConnections();
  await server.start();
};