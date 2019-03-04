import { createServer, createSecureServer } from 'http2';
import { readFileSync } from 'fs';

import { Routes } from '../src';
import { join } from 'path';


const routes = new Routes();


routes.add( 'get', '/hi', ( { res } ) => {
  res.end( 'hello' );
} );

routes.add( 'post', '/hi', ( { res } ) => {
  res.end( 'hello post' );
} );

routes.add( 'get', '/hi/:abc', ( { req, res } ) => {
  res.end( `hello ${ req.url }` );
} );


function run( port = 4200, secure = true ) {

  const server = secure ?
    createSecureServer( {
      key: readFileSync( join( __dirname, '..', '..', 'test', 'localhost-privkey.pem' ) ),
      cert: readFileSync( join( __dirname, '..', '..', 'test', 'localhost-cert.pem' ) )
    } ) :
    createServer();

  server.on( 'request', ( req, res ) => routes.route( { req, res } ) );

  server.on( 'error', ( err ) => console.error( err ) );
  server.listen( port );

  console.log( 'listening on', port );
  return server;
}

run();
