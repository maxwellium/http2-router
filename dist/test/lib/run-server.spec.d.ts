/// <reference types="node" resolution-mode="require"/>
import { Http2SecureServer } from 'node:http2';
export declare function runServer(port: number): Promise<Http2SecureServer>;
