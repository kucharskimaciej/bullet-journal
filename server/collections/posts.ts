declare var Namespace: any;

@Namespace("Collections")
class PostsCollection extends Collections.BaseCollection {
    constructor(name:string = "posts") {
        super(name);
    }
}

Namespace("Collections", function() {
   this.Posts = new this.PostsCollection;
});