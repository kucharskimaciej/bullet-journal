import { SUBJECT } from './constants';
import {IPost} from "../../collections/posts/posts";

export interface ISubject {
    subject: string;
    payload: any;
}

export const createPost = (user_id:string, post): ISubject => ({
    subject: SUBJECT.CREATE_POST,
    payload: {
        user_id, post
    }
});

export const removePost = (post: IPost): ISubject => ({
    subject: SUBJECT.REMOVE_POST,
    payload: {
        user_id: post.author, post
    }
});