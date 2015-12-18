/// <reference path='../typings/tsd.d.ts' />

import {Server} from 'hapi';
/* tslint:disable */ const Good = require('good');
import {IServerConnectionOptions} from 'hapi';
import Users from './plugins/users';

// Configs
const env = process.env.NODE_ENV || 'development';
import {
    manifest,
    database
} from './config';


const server: Server = new Server();
(manifest.connections || [])
    .forEach((connection: IServerConnectionOptions) => server.connection(connection));

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
    { register: Good, options: goodOptions },
    { register: Users.register, options: {
        db: database[env]
    }}
], (err: Error) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(() => {
        server.log('info', 'Server started');
    });
});