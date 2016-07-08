import {Meteor} from 'meteor/meteor';
import {
    FACEBOOK_SCOPE, GITHUB_SCOPE
} from '../constants';

export function withFacebook() {
    Meteor.loginWithFacebook({
        requestPermissions: FACEBOOK_SCOPE
    }, (err: Error) => {
        if (err) {
            console.error(err);
        }
    });
}

export function withGithub() {
    Meteor.loginWithGithub({
        requestPermissions: GITHUB_SCOPE
    }, (err:Error) => {
        if (err) {
            console.error(err);
        }
    });
}


export function logout() {
    Meteor.logout();
}