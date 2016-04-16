import * as _ from 'underscore';
const {first, keys, extend} = _;

import {Posts} from '../../collections/posts/posts';

const REGISTERED_SERVICES = ['facebook', 'github'];

Accounts.onCreateUser((options, user) => {
    let currentService, loginEmail;

    user.profile = extend({}, user.profile, options.profile);

    if (user.services) {
        currentService = first(keys(user.services));
        loginEmail = user.services[currentService].email;
    }

    const originalUser = Meteor.users.findOne({'verified_emails': loginEmail});

    if (!originalUser) {
        return user;
    }

    // remove old account
    try {
        Meteor.users.remove(originalUser._id);
    } catch (e) {
        throw new Meteor.Error(500, e.toString());
    }


    // add the services to the new account
    for (let service of REGISTERED_SERVICES) {
        if (originalUser.services[service]) {
            user.services[service] = originalUser.services[service];
        }
    }

    // update posts
    Posts.update({ author: originalUser._id }, { $set: { author: user._id }}, { multi: true });
    user.profile = extend({}, originalUser.profile, user.profile, options.profile);

    return user;
});
