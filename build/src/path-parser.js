"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
exports.rfc6570likeParser = {
    match: path => new RegExp(`^${path.replace(/\/\{[^/{}]+\}/g, '/[^/]+').replace(/\//g, '\\/')}$`),
    extract: path => new RegExp(`^${path.replace(/(\/\{([^/{}]+)\})/g, '/(?<$2>[^/]+)').replace(/\//g, '\\/')}$`)
};
exports.commonPathTemplateParser = {
    match: path => new RegExp(`^${path.replace(/\/:[^/]+/g, '/[^/]+').replace(/\//g, '\\/')}$`),
    extract: path => new RegExp(`^${path.replace(/(\/:([^/]+))/g, '/(?<$2>[^/]+)').replace(/\//g, '\\/')}$`)
};
function extractPathParameters(regex, url) {
    const { pathname } = url_1.parse(url);
    const match = (pathname || '').match(regex);
    return (match && match.groups) || null;
}
exports.extractPathParameters = extractPathParameters;
//# sourceMappingURL=path-parser.js.map