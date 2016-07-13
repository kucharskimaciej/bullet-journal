import {Meteor} from 'meteor/meteor';

export interface IUser {
    _id: string;
    verified_emails?: string[];
    profile: {
        name: string;
        picture?: string;
    };
    services: {
        facebook?: {
            id: string;
            email: string;
            first_name: string;
        },
        github?: {
            id: number;
        }
    };
}

export const Users = Meteor.users;