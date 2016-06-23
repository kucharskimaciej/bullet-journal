/// <reference path="../../../typings/index.d.ts" />
/// <reference path='../../lib/react-komposer.d.ts' />
/// <reference path='../../lib/flow-router.d.ts' />
/// <reference path='../../lib/react-textarea-autosize.d.ts' />

import {whyDidYouUpdate} from 'why-did-you-update';
import * as React from 'react';

if (process.env.NODE_ENV === 'development') {
    whyDidYouUpdate(React);
}

FlowRouter.wait();

import './global.styl';
import './routes';

Meteor.startup(function() {
    FlowRouter.initialize();
});