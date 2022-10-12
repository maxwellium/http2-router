import assert from 'node:assert';
import test from 'node:test';
import { getRequest } from './lib/get-request.spec.js';
import { PORT } from './lib/port.spec.js';
import { runServer } from './lib/run-server.spec.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


test('simple routing test', async (t) => {
  const server = await runServer(PORT);

  await t.test('simple route', async () => {
    const responseText = await getRequest('/users')
    assert.strictEqual(responseText, 'hello');
  });

  await t.test('route with parameter', async () => {
    const responseText = await getRequest('/users/maxwellium')
    assert.strictEqual(responseText, 'hello maxwellium');
  });

  server.close();
});
