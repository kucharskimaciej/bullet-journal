import * as React from 'react';
import {render} from 'react-dom';

import {BulletLayout} from './components/layout/bullet.tsx';
import {Bullet} from './components/bullet/component.tsx';

const APPLICATION_ROOT_ID = 'app';

function renderRoot(jsx) {
    return render(jsx, document.getElementById(APPLICATION_ROOT_ID));
}

const requireLogin = () => {
    if (!(Meteor.loggingIn() || Meteor.userId())) {
        let {route} = FlowRouter.current();

        if (route.name !== 'login') {
            Session.set('redirect', route.path);
        }

        FlowRouter.go('login');
    }
};

const protectedRoutes = FlowRouter.group({
    triggersEnter: [requireLogin]
});

const publicRoutes = FlowRouter.group({});

publicRoutes.route('/login', {
    name: 'login',
    action() {
        renderRoot(<h1>LOGIN</h1>);
    }
});

protectedRoutes.route('/', {
    name: 'root',
    action() {
        FlowRouter.go('home');
    }
});

protectedRoutes.route('/home', {
    name: 'home',
    action() {
        renderRoot(<h1>HOME</h1>);
    }
});

protectedRoutes.route('/logout', {
    name: 'logout',
    action() {
        Meteor.logout(() => {
           FlowRouter.go('login');
        });
    }
});

FlowRouter.notFound = {
    action() {
        renderRoot(<h1>404</h1>);
    }
};


Accounts.onLogin(() => {
    const redirect = Session.get('redirect');
    if (!!redirect && redirect !== '/login') {
        FlowRouter.go(redirect);
    }
});