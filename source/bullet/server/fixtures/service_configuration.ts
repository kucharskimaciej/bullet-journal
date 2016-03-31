import ISerivceConfiguration = ServiceConfiguration.ISerivceConfiguration;
const {settings} = Meteor;


if (Meteor.settings['facebook']) {
    configureService('facebook', Meteor.settings['facebook']);
}

if (Meteor.settings['github']) {
    configureService('github', Meteor.settings['github']);
}

function configureService(service: string, {appId, clientId, secret}: ISerivceConfiguration) {
    console.log('configuring ', service);
    ServiceConfiguration.configurations.remove({service});

    ServiceConfiguration.configurations.insert({
        service,
        appId,
        clientId,
        secret
    });
}