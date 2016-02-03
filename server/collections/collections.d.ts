declare module Collections {
    class BaseCollection extends Mongo.Collection<Object>{
        constructor(name:string);
    }

    class PostsCollection extends BaseCollection {
        constructor(name?: string);
    }

    const Posts: PostsCollection;
}