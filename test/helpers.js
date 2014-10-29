var _ = require('lodash-node');

var pack = require('../server');
var apiServer = pack._byId[ pack._byLabel["api"][0] ];

var _exports = {
    apiServer: apiServer,
    pack: pack,
    _: _
};

module.exports = _exports;
