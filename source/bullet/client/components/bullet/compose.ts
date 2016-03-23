import {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import {Posts, IPost} from '../../../collections/posts/posts';
import {IBulletProps} from './component';

function composeFn(_, onData) {
    const subs = [
        Meteor.subscribe('currentUser'),
        Meteor.subscribe('posts')
    ];


    if (subs.some((sub) => !sub.ready())) {
        return;
    }

    const user = Meteor.users.findOne(Meteor.userId());
    const posts = Posts.find({ author: Meteor.userId() }).fetch();

    onData(null, { posts, user, isLoggedIn: !!user });
}

export function compose(component: new () => Component<any, any>) {
    return composeWithTracker(composeFn)(component);
}