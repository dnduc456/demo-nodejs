'use strict';
const glob = require('glob');
const path = require('path');
const _ = require('lodash');

// add ping route by default for health check
const routes = [
    {
        method: 'GET',
        path: '/ping',
        handler: (request: any, reply: any) => {
            return reply.response('pong');
        },
        config: {
            tags: ['api'],
            description: 'Test API',
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/healthz',
        handler: (request: any, reply: any) => {
            return reply.response('OK').code(200);
        },
        config: {
            tags: ['api'],
            description: 'Check Health',
            auth: false
        }
    }];

// add all routes from all modules to the routes array manually or write your routes inside a folder inside the server folder
// with suffix as routes.js e.g user.routes.js

['*routes.js', '*routes.ts'].map((type: string) => {
    glob.sync(path.join(__dirname, `../routes/**/${type}`)).forEach((file: string) => {
        routes.push(require(path.resolve(file)).default);
    });
});

// export default routes;
export default _.flattenDeep(routes);
