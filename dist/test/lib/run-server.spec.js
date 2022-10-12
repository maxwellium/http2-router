import { createSecureServer } from 'node:http2';
import { executeRouting } from '../../src/index.js';
import { CERTIFICATE, CERTIFICATE_KEY } from './certificate.spec.js';
import { ROUTES } from '../routes.spec.js';
export function runServer(port) {
    return new Promise(resolve => {
        const server = createSecureServer({
            key: CERTIFICATE_KEY,
            cert: CERTIFICATE
        });
        server.on('request', (request, response) => executeRouting({ request, response }, ROUTES));
        server.on('error', (err) => console.error(err));
        server.listen(port, () => resolve(server));
    });
}
//# sourceMappingURL=run-server.spec.js.map