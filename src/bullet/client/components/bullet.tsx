/// <reference path='../../../../lib/react-komposer.d.ts' />
import {Component, PropTypes} from 'react';


import {composeWithTracker} from 'react-komposer';
import {firstName} from '../services/users';


import {UserName} from './user_name';
import {Login} from './login';

import {Posts, IPost} from '../../collections/posts/posts';

export interface IBulletProps {
    posts: IPost[];
}

class BulletComponent extends Component<IBulletProps> {
    static propTypes = {
        user: PropTypes.object,
        loggedIn: PropTypes.bool.isRequired
    };

    render() {
        const {user, loggedIn} = this.props;
        let userFragment, loginFragment;

        if (loggedIn) {
            userFragment = <span>, <UserName name={firstName(user)}/>!</span>;
        } else {
            loginFragment = <Login service='facebook'/>;
        }

        return <section>
            <h1>
                Hello{userFragment}
            </h1>
            {loginFragment}
        </section>;
    }
}

export const Bullet = composeWithTracker((_, onData) => {
    const sub = Meteor.subscribe('currentUser');
    const postSub = Meteor.subscribe('posts');

    if (!sub.ready() || !postSub.ready()) {
        return;
    }

    const user = Meteor.users.findOne(Meteor.userId());
    const posts = Posts.find({ author: Meteor.userId() }).fetch();
    if (user) {
        onData(null, {user, loggedIn: true, posts});
    } else {
        onData(null, {loggedIn: false});
    }
})(BulletComponent);
