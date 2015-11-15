/// <reference path="../typings/tsd.d.ts" />

const {server} = require('hapi');

// Configs
var env = process.env.NODE_ENV || "development";
var {manifest, database} = require('./config.ts');

// start server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
