import { IContext, IRouteHandler } from './types';
export declare function matchRouteHandlers({ request }: IContext, routeHandlers: IRouteHandler[]): IRouteHandler[];
export declare function executeRouting(ctx: IContext, routeHandlers: IRouteHandler[]): Promise<void>;
