/// <reference types="node" resolution-mode="require"/>
import { Http2ServerRequest, Http2ServerResponse } from 'node:http2';
export interface IContext {
    request: Http2ServerRequest;
    response: Http2ServerResponse;
}
export declare type Handler = (ctx: IContext) => void | Promise<void>;
export declare type Method = 'GET' | 'POST' | 'PUT' | string;
export interface IRouteHandler {
    methods: Method[];
    regex: RegExp;
    handler: Handler;
}
