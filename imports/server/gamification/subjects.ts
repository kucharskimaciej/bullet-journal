import { SUBJECT } from './constants';
import {IPost} from "../../collections/posts/posts";

export interface ISubject {
    type: string;
    payload: any;
}

export const createPost = (user_id:string, post): ISubject => ({
    type: SUBJECT.CREATE_POST,
    payload: {
        user_id, post
    }
});

export const removePost = (post: IPost): ISubject => ({
    type: SUBJECT.REMOVE_POST,
    payload: {
        user_id: post.author, post
    }
});