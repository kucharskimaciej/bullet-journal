/// <reference path='../lib/react-mounter.d.ts' />
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import * as React from 'react';
import {BulletLayout} from './components/layout/bullet';
import {Bullet} from './components/bullet/component';
import {LoginPage} from './components/auth/login_page';

import {mount} from 'react-mounter';

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
        mount(BulletLayout, {
            headerSize: 'large',
            children: <LoginPage />
        });
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
        mount(BulletLayout, {
            headerSize: 'small',
            children: <Bullet />
        });
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

Accounts.onLogin(() => {
    const redirect = Session.get('redirect');
    if (!!redirect && redirect !== '/login') {
        FlowRouter.go(redirect);
    } else {
        FlowRouter.go('home');
    }
});