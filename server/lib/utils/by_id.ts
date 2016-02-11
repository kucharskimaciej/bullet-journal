Namespace('utils', {
   findById<T extends Function>(
       target: Function,
       key: string,
       descriptor: TypedPropertyDescriptor<T>
   ): TypedPropertyDescriptor<T> | void {
       return <any> {
           value: function (queryObject: { _id: string }, ...rest) {
                let result = this.collection.findOne({ _id: queryObject._id });
                return descriptor.value.apply(this, [result, queryObject, ...rest]);
           }
       };
   }
});