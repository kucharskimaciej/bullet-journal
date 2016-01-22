declare var Namespace: any;

declare module Collections {

}

@Namespace("Collections")
class BaseCollection extends Mongo.Collection<Object> {
    constructor(name:string) {
        super(name);
    }
}
