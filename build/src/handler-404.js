export function handler404(ctx) {
    if (!ctx.response.finished) {
        ctx.response.statusCode = 404;
        ctx.response.end('not found');
    }
}
//# sourceMappingURL=handler-404.js.map