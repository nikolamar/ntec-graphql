import server from './server';

async function runApp() {
  await server.createConnections();
  server.start();
}

runApp();