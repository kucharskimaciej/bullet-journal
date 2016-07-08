import {Meteor} from 'meteor/meteor';
// @todo: Provide actual typings
declare var ServiceConfiguration: any;


if (Meteor.settings['private']['facebook']) {
    configureService('facebook', Meteor.settings['private']['facebook']);
}

if (Meteor.settings['private']['github']) {
    configureService('github', Meteor.settings['private']['github']);
}

function configureService(service: string, {appId, clientId, secret}) {
    console.log('configuring ', service);
    ServiceConfiguration.configurations.remove({service});

    ServiceConfiguration.configurations.insert({
        service,
        appId,
        clientId,
        secret
    });
}