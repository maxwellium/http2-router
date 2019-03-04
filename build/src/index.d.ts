import { Http2ServerRequest, Http2ServerResponse } from 'http2';
export declare const NEXT: unique symbol;
export interface Context {
    req: Http2ServerRequest;
    res: Http2ServerResponse;
}
export declare type Handler = (ctx: Context) => void | any | Promise<any>;
export interface Route {
    method: string;
    route: string;
    regex: RegExp;
    handler: Handler;
}
export declare class Routes {
    routes: Route[];
    add(method: string, route: string, handler: Handler): void;
    route(ctx: Context): Promise<void>;
}
