"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const certificate_1 = require("./certificate");
const path_parser_1 = require("../src/path-parser");
const http2_1 = require("http2");
const index_1 = require("../src/index");
const handler_404_1 = require("../src/handler-404");
const routes = [];
routes.push({
    methods: ['GET'],
    regex: path_parser_1.rfc6570likeParser.match('/users'),
    handler: ({ response }) => response.end('hello')
});
routes.push({
    methods: ['GET'],
    regex: path_parser_1.rfc6570likeParser.match('/users/{userName}'),
    handler: ({ request, response }) => {
        const extract = path_parser_1.rfc6570likeParser.extract('/users/{userName}');
        const parameters = path_parser_1.extractPathParameters(extract, request.url);
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
    handler: handler_404_1.handler404
});
function run(port) {
    const server = http2_1.createSecureServer({
        key: certificate_1.key,
        cert: certificate_1.cert
    });
    server.on('request', (request, response) => index_1.executeRouting({ request, response }, routes));
    server.on('error', (err) => console.error(err));
    server.listen(port);
    console.log('listening on', port);
    return server;
}
run(8080);
//# sourceMappingURL=test.js.map