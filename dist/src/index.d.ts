import { IContext, IRouteHandler } from './types.js';
export declare function matchRouteHandlers({ request }: IContext, routeHandlers: IRouteHandler[]): IRouteHandler[];
export declare function executeRouting(ctx: IContext, routeHandlers: IRouteHandler[]): Promise<void>;
