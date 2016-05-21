import ISerivceConfiguration = ServiceConfiguration.ISerivceConfiguration;
const {settings} = Meteor;


if (settings['private']['facebook']) {
    configureService('facebook', settings['private']['facebook']);
}

if (settings['private']['github']) {
    configureService('github', settings['private']['github']);
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