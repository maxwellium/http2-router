"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
function matchRouteHandlers({ request }, routeHandlers) {
    return routeHandlers.filter(routeHandler => {
        if (!routeHandler.methods.includes(request.method)) {
            return false;
        }
        const { pathname } = url_1.parse(request.url);
        const match = (pathname || '').match(routeHandler.regex);
        return match !== null;
    });
}
exports.matchRouteHandlers = matchRouteHandlers;
async function executeRouting(ctx, routeHandlers) {
    const handlers = matchRouteHandlers(ctx, routeHandlers);
    for (const { handler } of handlers) {
        try {
            await handler(ctx);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.executeRouting = executeRouting;
//# sourceMappingURL=index.js.map