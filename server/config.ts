import {readFileSync} from 'fs';
import {join} from 'path';
import {parse} from 'ini';
import {defaultsDeep} from 'lodash';
import {IServerConnectionOptions} from "hapi";

const config = parse(readFileSync(join(__dirname, '../config.ini'), 'utf-8'));

export const manifest = {
    connections: <IServerConnectionOptions[]>[
        {
            port: config.server.port,
            labels: ['api']
        },
        {
            port: config.client.port,
            labels: ['client']
        }
    ]
};
const db = {
    development: config.development_db,
    test: config.test_db,
    production: config.production_db
};

const defaultDatabaseSettings = {
    decorate: 'db',
    settings: {}
};

export const db = Object.keys(_database).reduce(($, key: string) => {
    $[key] = defaultsDeep(_database[key], defaultDatabaseSettings);
    return $;
}, {});