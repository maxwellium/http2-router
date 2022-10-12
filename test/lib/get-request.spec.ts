import { connect } from 'node:http2';
import { PORT } from './port.spec.js';

export function getRequest(path: string) {
  return new Promise((resolve, reject) => {
    const client = connect(`https://localhost:${PORT}`);
    client.on('error', err => reject(err));

    const req = client.request({ ':path': path });
    let data = '';

    req.on('error', err => reject(err));
    req.setEncoding('utf8');
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      resolve(data);
      client.close();
    });
    req.end();
  });
}