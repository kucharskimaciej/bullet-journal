var fs = require('fs');
var ini = require('ini');

config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

module.exports = {
    manifest: {
        pack: {},
        servers: [
            {
                host: config.server.host,
                port: config.server.port,
                options: {
                    cors: true,
                    labels: ["api"],
                    validation: {
                        abortEarly: false,
                        presence: 'required'
                    }
                }
            }
        ],
        plugins: {
            './posts' : [{ select: 'api' }]
        }
    },
    database: {
        development: config.development_db,
        test: config.test_db,
        production: config.production_db

    }
};