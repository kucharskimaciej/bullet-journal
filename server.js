'use strict';
// External libs
var Hapi = require('hapi');
var Path = require('path');
var mongoose = require('mongoose');

// Configs
var env = process.env.NODE_ENV || "development";
var config = require('./config.js');

// create server
var server = new Hapi.Server();

// connect to the DB
mongoose.connect(config.database[env].host + ':' + config.database[env].port + '/' + config.database[env].db, {
    user: config.database[env].username,
    pass: config.database[env].password
});

// create connections (pack)
config.manifest.servers.forEach(function (options) {
    server.connection(options)
});

// register plugins
Object.keys(config.manifest.plugins).forEach(function (name) {
    var plugin;
    plugin = require(Path.join(__dirname, 'modules', name));
    plugin.options = config.manifest.plugins[name];

    server.register(plugin, function (err) {
        if(err) {
            console.log(err);
        }
    });
});

// start server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
