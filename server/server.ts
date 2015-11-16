/// <reference path="../typings/tsd.d.ts" />

const {Server} = require('hapi');
const Good = require('good');

// Configs
const env = process.env.NODE_ENV || "development";
const {
    manifest: {connections = []},
    database
} = require('./config.ts');


const server = new Server();
connections.forEach((connection) => server.connection(connection));

// start server
server.register([{
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}], (err: Error) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(() => {
        server.log('info', 'Server started');
    });
});