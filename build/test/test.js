import { cert, key } from './certificate';
import { extractPathParameters, rfc6570likeParser } from '../src/path-parser';
import { createSecureServer } from 'http2';
import { executeRouting } from '../src/index';
import { handler404 } from '../src/handler-404';
const routes = [];
routes.push({
    methods: ['GET'],
    regex: rfc6570likeParser.match('/users'),
    handler: ({ response }) => response.end('hello')
});
routes.push({
    methods: ['GET'],
    regex: rfc6570likeParser.match('/users/{userName}'),
    handler: ({ request, response }) => {
        const extract = rfc6570likeParser.extract('/users/{userName}');
        const parameters = extractPathParameters(extract, request.url);
        if (!parameters) {
            return;
        }
        const { userName } = parameters;
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(`hello ${decodeURI(userName)}`);
    }
});
routes.push({
    methods: ['GET', 'POST', 'PUT'],
    regex: /.*/,
    handler: handler404
});
function run(port) {
    const server = createSecureServer({
        key,
        cert
    });
    server.on('request', (request, response) => executeRouting({ request, response }, routes));
    server.on('error', (err) => console.error(err));
    server.listen(port);
    console.log('listening on', port);
    return server;
}
run(8080);
//# sourceMappingURL=test.js.map