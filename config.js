var fs = require("fs");
var ini = require("ini");

var config = ini.parse(fs.readFileSync("./config.ini", "utf-8"));

module.exports = {
    manifest: {
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
    },
    database: {
        development: config.development_db,
        test: config.test_db,
        production: config.production_db
    }
};