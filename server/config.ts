const {readFileSync} = require("fs");
const {join} = require("path");
const {parse} = require("ini");
const {defaultsDeep} = require("lodash");

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
const _database = {
    development: config.development_db,
    test: config.test_db,
    production: config.production_db
};

const defaultDatabaseSettings = {
    decorate: "db",
    settings: {}
};

export const database = Object.keys(_database).reduce(($, key: string) => {
    $[key] = defaultsDeep(_database[key], defaultDatabaseSettings);
    return $;
}, {});