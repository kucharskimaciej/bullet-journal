/// <reference path="../../../../typings/tsd.d.ts" />
import {Component, PropTypes} from 'react';


const {composeWithTracker} = require('react-komposer');
import Users from '../services/users';


import {UserName} from './user_name';
import {Login} from './login';

class BulletComponent extends Component {
    static propTypes = {
        user: PropTypes.object,
        loggedIn: PropTypes.bool.isRequired
    };

    render() {
        const {user, loggedIn} = this.props;
        let userFragment, loginFragment;

        if(loggedIn) {
            userFragment = <span>, <UserName name={Users.firstName(user)}/>!</span>
        } else {
            loginFragment = <Login service="facebook"/>;
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

    if(sub.ready()) {
        const user = Meteor.users.findOne(Meteor.userId());
        if(user) {
            onData(null, {user, loggedIn: true});
        }
        else {
            onData(null, {loggedIn: false});
        }
    }


})(BulletComponent);
