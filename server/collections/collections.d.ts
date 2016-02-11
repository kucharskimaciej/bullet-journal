declare module Collections {
    interface IPost {
        title: string;
        body: string;
        author: string;
        slug?: string;
        _id?: string;
        created_at?: number;
        edited_at?: number;
    }

    var Posts: Mongo.Collection<IPost>;
}