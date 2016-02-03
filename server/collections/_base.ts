@Namespace("Collections")
class BaseCollection extends Mongo.Collection<Object> {
    constructor(name:string) {
        super(name);
    }
}
