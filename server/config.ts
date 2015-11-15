var {readFileSync} = require("fs");
var {join} = require("path");
var {parse} = require("ini");

const config = parse(readFileSync(join(__dirname, "../config.ini"), "utf-8"));

export const manifest = {
    servers: [
        {
            host: config.server.host,
            port: config.server.port,
            labels: ["api"],
            routes: {
                cors: true,
                validate: {
                    options: {
                        abortEarly: false,
                        presence: "required"
                    }
                }
            }
        }
    ],
    plugins: {
        "posts" : { labels: ["api"] },
        "users" : { labels: ["api", "auth"] }
    }
};
export const database = {
    development: config.development_db,
    test: config.test_db,
    production: config.production_db
};