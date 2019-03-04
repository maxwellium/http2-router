"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http2_1 = require("http2");
const fs_1 = require("fs");
const src_1 = require("../src");
const path_1 = require("path");
const routes = new src_1.Routes();
routes.add('get', '/hi', ({ res }) => {
    res.end('hello');
});
routes.add('post', '/hi', ({ res }) => {
    res.end('hello post');
});
routes.add('get', '/hi/:abc', ({ req, res }) => {
    res.end(`hello ${req.url}`);
});
function run(port = 4200, secure = true) {
    const server = secure ?
        http2_1.createSecureServer({
            key: fs_1.readFileSync(path_1.join(__dirname, '..', '..', 'test', 'localhost-privkey.pem')),
            cert: fs_1.readFileSync(path_1.join(__dirname, '..', '..', 'test', 'localhost-cert.pem'))
        }) :
        http2_1.createServer();
    server.on('request', (req, res) => routes.route({ req, res }));
    server.on('error', (err) => console.error(err));
    server.listen(port);
    console.log('listening on', port);
    return server;
}
run();
//# sourceMappingURL=test.js.map