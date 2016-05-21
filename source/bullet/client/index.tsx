/// <reference path='../../lib/react-komposer.d.ts' />
/// <reference path='../../lib/flow-router.d.ts' />
//import FlowRouter = __FlowRouter.FlowRouter;
import {whyDidYouUpdate} from 'why-did-you-update';
import * as React from 'react';

if (Meteor.settings['public']['env'] === 'DEVELOPMENT') {
    whyDidYouUpdate(React);
}

FlowRouter.wait();

import './global.styl';
import './routes';

Meteor.startup(function() {
    FlowRouter.initialize();
});