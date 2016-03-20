/// <reference path="../../../typings/browser.d.ts" />
/// <reference path='../../../lib/react-komposer.d.ts' />
/// <reference path='../../../lib/flow-router.d.ts' />
import {FlowRouter} from 'meteor/meteorhacks:flow-router';
import './routes';

Meteor.startup(function() {
    FlowRouter.initialize();
});