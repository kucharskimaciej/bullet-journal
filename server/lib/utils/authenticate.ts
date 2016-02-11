Namespace('utils', {
    authenticate<T extends Function>(
        target: Function,
        key: string,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void {
        return <any> {
            value: function () {
                if (!Meteor.userId()) {
                    throw new Meteor.Error(403, 'Unauthenticated');
                }

                return descriptor.value.apply(this, arguments);
            }
        };
    }
});