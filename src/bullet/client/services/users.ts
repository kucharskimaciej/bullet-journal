const {pairs} = require('underscore');

export interface IUser {
    _id: string;
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


export function fullName(user: IUser) {
    return user.profile.name;
}

export function firstName(user: IUser) {
    if (user.services.facebook.first_name) {
        return user.services.facebook.first_name;
    }

    const [firstName, ...rest] = user.profile.name.split(' ');

    return firstName;
}