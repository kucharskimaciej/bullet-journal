/// <reference path='../../lib/react-komposer.d.ts' />
/// <reference path='../../lib/flow-router.d.ts' />
//import FlowRouter = __FlowRouter.FlowRouter;
FlowRouter.wait();

import './global.styl';
import './routes';

Meteor.startup(function() {
    FlowRouter.initialize();
});