export function authenticate<T extends Function>(target: any,
                                                 key:string,
                                                 descriptor:TypedPropertyDescriptor<T>):TypedPropertyDescriptor<T> | void {
    return <any> {
        value: function () {
            if (!Meteor.userId()) {
                throw new Meteor.Error(401, 'Unauthorized');
            }

            return descriptor.value.apply(this, arguments);
        }
    };
}

export function findById<T extends Function>(target:any,
                                             key:string,
                                             descriptor:TypedPropertyDescriptor<T>):TypedPropertyDescriptor<T> | void {
    return <any> {
        value: function (queryObject:{ _id: string }, ...rest) {
            let result = this.collection.findOne({_id: queryObject._id});
            if (!result) {
                throw new Meteor.Error(404, 'Not found');
            }

            return descriptor.value.apply(this, [result, queryObject, ...rest]);
        }
    };
}

export class Methods<CollectionType> {
    private collection:CollectionType;

    constructor(collection:CollectionType) {
        this.collection = collection;
    }

    get userId() {
        return Meteor.userId();
    }
}

export interface IRegisterMethodsConfig {
    collection: any;
    methods: string[];
}

export function registerMethods(config:IRegisterMethodsConfig) {
    return function (target:any) {
        const instance = new target(config.collection);
        const $methods = {};

        config.methods.forEach((methodName) => {
            $methods[methodName] = function () {
                return instance[methodName].apply(instance, arguments);
            };
        });

        Meteor.methods($methods);
    };
}
