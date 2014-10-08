var _ = require('lodash-node');
var Lab = require('lab');
var lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Lab.expect;

var pack = require('../server');
var apiServer = pack._byId[ pack._byLabel["api"][0] ];

var _exports = {
    Lab: Lab,
    lab: lab,
    it: it,
    before: before,
    after: after,
    expect: expect,
    describe: describe,
    apiServer: apiServer,
    pack: pack
};

module.exports = _exports;
