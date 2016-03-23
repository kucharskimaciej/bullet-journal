export interface IPost {
    title: string;
    body: string;
    created_at: number;
    slug: string;
    author: string;
    _id: string;
}

export const Posts = new Mongo.Collection<IPost>('posts');