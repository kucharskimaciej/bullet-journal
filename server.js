'use strict';
// External libs
var Hapi = require('hapi');
var Path = require('path');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV || "development";
// Configs
var config = require('./config.js');

mongoose.connect(config.database[env].host + ':' + config.database[env].port + '/' + config.database[env].db, {
    user: config.database[env].username,
    pass: config.database[env].password
});


var server = new Hapi.Server();

config.manifest.servers.forEach(function (options) {
    server.connection(options)
});

//Hapi.Pack.compose(config.manifest, { relativeTo: Path.join(__dirname, 'modules') }, function (err, pack) {
//    module.exports = pack;
//    if (!module.parent) {
//        pack.start(function () {
//            console.log("Server started.");
//
//        });
//    }
//});
