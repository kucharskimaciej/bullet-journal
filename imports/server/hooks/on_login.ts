import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

import * as _ from 'underscore';
const {contains, keys, unique} = _;

interface IServiceEmail {
    verified: boolean;
    email: string;
}
Accounts.onLogin(({ user }) => {
    const SKIP_SERVICES = ['resume'];
    const WHITELIST_SERVICES = ['facebook'];

    if (!user.services) {
        return;
    }

    const verifiedEmails = [];


    if (user.verified_emails) {
        user.verified_emails
            .filter(Boolean)
            .forEach((email) => verifiedEmails.push(email));
    }

    keys(user.services)
        .filter((service) => !contains(SKIP_SERVICES, service))
        .forEach((serviceName) => {
            const service = user.services[serviceName];

            if (contains(WHITELIST_SERVICES, serviceName)) {
                verifiedEmails.push(service.email);
            }


            if (service.emails) {
                Object.keys(service.emails)
                    .map((email: string) => service.emails[email] as IServiceEmail)
                    .filter(({ verified }) => verified)
                    .map(({ email }) => email)
                    .forEach((email) => verifiedEmails.push(email));
            }

        });

    Meteor.users.update(user._id, {
        $set: { verified_emails: unique(verifiedEmails) }
    });
});
