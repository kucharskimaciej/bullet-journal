const Monk = require('monk');

export class UsersDb {
    private db;

    constructor(connectionString) {
        this.db = Monk(connectionString).get("users");

        console.log(this.db);
    }
}