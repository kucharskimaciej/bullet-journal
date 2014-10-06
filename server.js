'use strict';
// External libs
var Hapi = require('hapi');
var Path = require('path');
var mongoose = require('mongoose');

// Configs
var config = require('./config.js');

mongoose.connect(config.database.host + ':' + config.database.port + '/' + config.database.db, {
    user: config.database.username,
    pass: config.database.password
});

Hapi.Pack.compose(config.manifest, { relativeTo: Path.join(__dirname, 'modules') }, function (err, pack) {
    module.exports = pack;
    if (!module.parent) {
        pack.start(function () {
            console.log("Server started.");

        });
    }
});


