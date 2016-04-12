export interface IUser {
    _id: string;
    verified_emails?: string[];
    profile: {
        name: string;
    };
    services: {
        facebook?: {
            email: string;
            first_name: string;
        }
    };
}

Meteor.users.deny({
    update() {
        return true;
    }
});