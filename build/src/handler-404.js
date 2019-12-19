"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handler404(ctx) {
    if (!ctx.response.finished) {
        ctx.response.statusCode = 404;
        ctx.response.end('not found');
    }
}
exports.handler404 = handler404;
//# sourceMappingURL=handler-404.js.map