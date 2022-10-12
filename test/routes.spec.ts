import { handler404 } from '../src/handler-404.js';
import { extractPathParameters, rfc6570likeParser } from '../src/path-parser.js';
import { IRouteHandler } from '../src/types.js';

export const ROUTES: IRouteHandler[] = [];

ROUTES.push({
  methods: ['GET'],
  regex: rfc6570likeParser.match('/users'),
  handler: ({ response }) => { response.end('hello'); }
});

ROUTES.push({
  methods: ['GET'],
  regex: rfc6570likeParser.match('/users/{userName}'),
  handler: ({ request, response }) => {

    const extract = rfc6570likeParser.extract('/users/{userName}');

    const parameters = extractPathParameters<{ userName: string; }>(extract, request.url);
    if (!parameters) {

      return;

    }
    const { userName } = parameters;
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`hello ${decodeURI(userName)}`);

  }
});

ROUTES.push({
  methods: ['GET', 'POST', 'PUT'],
  regex: /.*/,
  handler: handler404
});
