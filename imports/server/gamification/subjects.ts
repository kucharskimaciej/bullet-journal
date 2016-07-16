import { SUBJECT } from './constants';

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