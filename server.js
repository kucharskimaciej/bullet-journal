'use strict';
// External libs
var Hapi = require('hapi');
var Path = require('path');
var mongoose = require('mongoose');

// Configs
var env = process.env.NODE_ENV || "development";
var config = require('./config.js');

// start server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});

module.exports = server;
