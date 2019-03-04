import { Http2ServerRequest, Http2ServerResponse } from 'http2';

export const NEXT = Symbol( 'next' );

export interface Context {
  req: Http2ServerRequest;
  res: Http2ServerResponse;
}

export type Handler = ( ctx: Context ) => void | any | Promise<any>;

export interface Route {
  method: string;
  route: string;
  regex: RegExp;
  handler: Handler;
}


export class Routes {

  public routes: Route[] = [];


  add( method: string, route: string, handler: Handler ) {

    const regex = new RegExp( `^${
      route
        .replace( /\//g, '\\/' )
        .replace( /(:([^\/\\]+))/g, '[^/?]' )
      }$` );
    method = method.toUpperCase();

    this.routes.push( {
      method,
      route,
      regex,
      handler
    } );
  }


  async route( ctx: Context ) {

    const url = ctx.req.url.replace( /(\?.+)/, '' );

    for ( const route of this.routes ) {
      if (
        ( ctx.req.method === route.method || '*' === route.method ) &&
        url.match( route.regex )
      ) {
        if ( NEXT !== await route.handler.call( route.handler, ctx ) ) {
          return;
        }
      }
    }

    //FIXME: add logging and 404 configurable handler
    console.error( '404', ctx.req.method, ctx.req.url );
    ctx.res.statusCode = 404;
    ctx.res.end( 'not found' );
  }

}
