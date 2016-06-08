import * as React from 'react';
import {render} from 'react-dom';

import {BulletLayout} from './components/layout/bullet.tsx';
import {Bullet} from './components/bullet/component';
import {LoginPage} from './components/auth/login_page';

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
        renderRoot(<BulletLayout headerSize="large">
            <LoginPage></LoginPage>
        </BulletLayout>);
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
        renderRoot(<BulletLayout headerSize="small">
            <Bullet></Bullet>
        </BulletLayout>);
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
    } else {
        FlowRouter.go('home');
    }
});