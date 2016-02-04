declare module Collections {
    class BaseCollection extends Mongo.Collection<Object> {
        constructor(name: string);
    }

    class PostsCollection extends BaseCollection {
        constructor(name?: string);
    }

    const Posts: PostsCollection;

    interface IPost {
        title: string;
        body: string;
        slug?: string;
        _id?: string;
        created_at?: number;
        edited_at?: number;
    }
}