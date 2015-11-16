var {readFileSync} = require("fs");
var {join} = require("path");
var {parse} = require("ini");

const config = parse(readFileSync(join(__dirname, "../config.ini"), "utf-8"));

export const manifest = {
    connections: [
        {
            port: config.server.port,
            labels: ["api"]
        },
        {
            port: config.client.port,
            labels: ["client"]
        }
    ]
};
export const database = {
    development: config.development_db,
    test: config.test_db,
    production: config.production_db
};