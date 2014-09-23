'use strict';
// External libs
var Hapi = require('hapi');
var Path = require('path');

// Configs
var config = require('./config.js');



Hapi.Pack.compose(config.manifest, { relativeTo: Path.join(__dirname, 'modules') },function (err, pack) {
    pack.start(function () {
        console.log("Server started.");
    });

});
