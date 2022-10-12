import { IContext } from './types.js';

export function handler404( ctx: IContext ) {

  if ( !ctx.response.writableEnded ) {

    ctx.response.statusCode = 404;
    ctx.response.end( 'not found' );

  }

}
