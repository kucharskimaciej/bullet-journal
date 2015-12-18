import {Plugin} from '../../lib/plugin';
import {UsersDb} from './db';

export class Users extends Plugin {
    private db;

    constructor() {
        super("users");
    }

    _register(server, { db }) {
        this.db = new UsersDb(db.url);
    }
}