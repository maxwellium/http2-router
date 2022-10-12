import { parse } from 'node:url';

export interface IPathParser {
  match: ( path: string ) => RegExp;
  extract: ( path: string ) => RegExp;
}

export const rfc6570likeParser: IPathParser = {
  match: path => new RegExp( `^${ path.replace( /\/\{[^/{}]+\}/g, '/[^/]+' ).replace( /\//g, '\\/' ) }$` ),
  extract: path => new RegExp( `^${ path.replace( /(\/\{([^/{}]+)\})/g, '/(?<$2>[^/]+)' ).replace( /\//g, '\\/' ) }$` )
};
export const commonPathTemplateParser: IPathParser = {
  match: path => new RegExp( `^${ path.replace( /\/:[^/]+/g, '/[^/]+' ).replace( /\//g, '\\/' ) }$` ),
  extract: path => new RegExp( `^${ path.replace( /(\/:([^/]+))/g, '/(?<$2>[^/]+)' ).replace( /\//g, '\\/' ) }$` )
};

export function extractPathParameters<T extends { [ key: string ]: string }>( regex: RegExp, url: string ): T | null {

  const { pathname } = parse( url );
  const match = ( pathname || '' ).match( regex );
  return ( match && match.groups ) as T || null;

}