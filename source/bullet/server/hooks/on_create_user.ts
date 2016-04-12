import {Posts} from '../../collections/posts/posts'
import * as _ from 'lodash';
const {first, keys} = _;

const REGISTERED_SERVICES = ['facebook', 'github'];

Accounts.onCreateUser((options, user) => {
    let currentService, loginEmail;

    if(options.profile) {
        user.profile = options.profile;
    }

    if(user.services) {
        currentService = first(keys(user.services));
        loginEmail = user.services[currentService].email;
    }

    let originalUser = Meteor.users.findOne({'verified_emails': loginEmail});

    if(originalUser) {
        // remove old account
        try {
            Meteor.users.remove(originalUser._id);
        } catch (e:Error) {
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
        user.profile = Object.assign({}, originalUser.profile, user.profile, options.profile);
    }

    return user;
});

Meteor.startup(function() {
    let users = Meteor.users.find({}).fetch();
    console.log(users);
});
