"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEXT = Symbol('next');
class Routes {
    constructor() {
        this.routes = [];
    }
    add(method, route, handler) {
        const regex = new RegExp(`^${route
            .replace(/\//g, '\\/')
            .replace(/(:([^\/\\]+))/g, '[^/?]')}$`);
        method = method.toUpperCase();
        this.routes.push({
            method,
            route,
            regex,
            handler
        });
    }
    async route(ctx) {
        const url = ctx.req.url.replace(/(\?.+)/, '');
        for (const route of this.routes) {
            if ((ctx.req.method === route.method || '*' === route.method) &&
                url.match(route.regex)) {
                if (exports.NEXT !== await route.handler.call(route.handler, ctx)) {
                    return;
                }
            }
        }
        //FIXME: add logging and 404 configurable handler
        console.error('404', ctx.req.method, ctx.req.url);
        ctx.res.statusCode = 404;
        ctx.res.end('not found');
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map