import { Request, ResponseToolkit, server, ServerOptions, ServerRoute } from '@hapi/hapi';
import { wrapError } from '..';

type Callback = (params: any) => any | Promise<any>;
type RequestIndex = 'payload' | 'query';

export const startServer = async (options: ServerOptions, routes: ServerRoute[]) => {
    try {
        options.routes = {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Content-Type'],
                additionalHeaders: ['X-Requested-With']
            }
        };

        const client = server(options);

        client.route(routes);
        await client.start();

        console.log('Server running on %s', client.info.uri);
    } catch (error) {
        throw wrapError(error, 'startServer');
    }
};

export const buildRouteHandler = (cb: Callback, index?: RequestIndex) => {
    return async (request: Request, h: ResponseToolkit) => {
        try {
            return h.response(await cb(index ? request[index] : undefined));
        } catch (error) {
            throw wrapError(error, cb.name);
        }
    };
};

export const addPrefix = (routes: ServerRoute[], prefix: string) =>
    routes.map(route => ({ ...route, path: `/${prefix}${route.path}` }));
