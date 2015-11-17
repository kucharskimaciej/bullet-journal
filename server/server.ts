/// <reference path="../typings/tsd.d.ts" />

import {Server} from "hapi";
const Good = require('good');

// Configs
const env = process.env.NODE_ENV || "development";
const {
    manifest: {connections = []},
    database
} = require('./config.ts');


const server: Server = new Server();
connections.forEach((connection) => server.connection(connection));

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
    },
    {
        register: require('hapi-mongodb'),
        options: database[env]
    }
], (err: Error) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(() => {
        server.log('info', 'Server started');
    });
});