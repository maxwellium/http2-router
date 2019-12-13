import { IContext } from './types';

export function handler404( ctx: IContext ) {

  if ( !ctx.response.finished ) {

    ctx.response.statusCode = 404;
    ctx.response.end( 'not found' );

  }

}
