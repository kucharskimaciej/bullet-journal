/// <reference path='../typings/tsd.d.ts' />

import {Server} from 'hapi';
import {Good} from 'good';
import {IServerConnectionOptions} from 'hapi';

// Configs
const env = process.env.NODE_ENV || 'development';
import {
    manifest,
    database
} from './config.ts';


const server: Server = new Server();
connections.forEach((connection: IServerConnectionOptions) => server.connection(connection));

const goodOptions = {
    reporters: [{
        reporter: require('good-console'),
        events: {
            response: '*',
            log: '*'
        }
    }]
};

// start server
server.register([
    {
        register: Good,
        options: goodOptions
    }
], (err: Error) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(() => {
        server.log('info', 'Server started');
    });
});