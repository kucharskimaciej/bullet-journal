const {pairs} = require('underscore');

import {IUser} from '../../collections/users/users';


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