import { parse } from 'node:url';
export const rfc6570likeParser = {
    match: path => new RegExp(`^${path.replace(/\/\{[^/{}]+\}/g, '/[^/]+').replace(/\//g, '\\/')}$`),
    extract: path => new RegExp(`^${path.replace(/(\/\{([^/{}]+)\})/g, '/(?<$2>[^/]+)').replace(/\//g, '\\/')}$`)
};
export const commonPathTemplateParser = {
    match: path => new RegExp(`^${path.replace(/\/:[^/]+/g, '/[^/]+').replace(/\//g, '\\/')}$`),
    extract: path => new RegExp(`^${path.replace(/(\/:([^/]+))/g, '/(?<$2>[^/]+)').replace(/\//g, '\\/')}$`)
};
export function extractPathParameters(regex, url) {
    const { pathname } = parse(url);
    const match = (pathname || '').match(regex);
    return (match && match.groups) || null;
}
//# sourceMappingURL=path-parser.js.map