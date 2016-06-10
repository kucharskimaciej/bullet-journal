export interface IPost {
    body: string;
    created_at: number;
    author: string;
    _id: string;
}

export const Posts = new Mongo.Collection<IPost>('posts');