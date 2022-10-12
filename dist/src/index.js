import { parse } from 'node:url';
export function matchRouteHandlers({ request }, routeHandlers) {
    return routeHandlers.filter(routeHandler => {
        if (!routeHandler.methods.includes(request.method)) {
            return false;
        }
        const { pathname } = parse(request.url);
        const match = (pathname || '').match(routeHandler.regex);
        return match !== null;
    });
}
export async function executeRouting(ctx, routeHandlers) {
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
//# sourceMappingURL=index.js.map