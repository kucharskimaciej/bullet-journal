if(Meteor.settings.facebook) {
    configureService('facebook', Meteor.settings.facebook);
}

if (Meteor.settings.github) {
    configureService('github', Meteor.settings.github);
}

function configureService(service, settings) {
    console.log('configuring ', service);
    ServiceConfiguration.configurations.remove({service: service});

    ServiceConfiguration.configurations.insert({
        service: service,
        appId: settings.appId,
        secret: settings.secret
    });
}


FlowRouter.wait();