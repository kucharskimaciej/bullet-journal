import IRegisterMethodsConfig = utils.IRegisterMethodsConfig;
@Namespace('utils')
class Methods<CollectionType> {
    private collection: CollectionType;
    constructor(collection: CollectionType) {
        this.collection = collection;
    }

    get userId() {
        return Meteor.userId();
    }
}

Namespace('utils', {
    registerMethods: (config: IRegisterMethodsConfig) => {
        return function (target: any) {
            const instance = new target(config.collection);
            const $methods = {};

            config.methods.forEach((methodName) => {
                $methods[methodName] = function() {
                    return instance[methodName].apply(instance, arguments);
                };
            });

            Meteor.methods($methods);
        };
    }
});