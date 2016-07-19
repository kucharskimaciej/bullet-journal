import { SUBJECT } from './constants';
import {IPost, IServerPost} from "../../collections/posts/posts";

export interface ISubject<PayloadType> {
    type: string;
    payload: PayloadType;
}

export interface IPostSubjectPayload {
    user_id: string;
    post: IServerPost|IPost;
}

export const createPost = (user_id:string, post): ISubject<IPostSubjectPayload> => ({
    type: SUBJECT.CREATE_POST,
    payload: {
        user_id, post
    }
});

export const removePost = (post: IPost): ISubject<IPostSubjectPayload> => ({
    type: SUBJECT.REMOVE_POST,
    payload: {
        user_id: post.author, post
    }
});