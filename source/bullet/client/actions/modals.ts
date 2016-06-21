import {IPost} from "../../collections/posts/posts";
import * as actions from './constants';
import {modal} from '../constants';

const showModal = (type: string) => data => ({
    type: actions.SHOW_MODAL,
    payload: {
        type, data
    }
});

export const showUpdateModal = (post: IPost) => 
    showModal(modal.UPDATE_POST)(post);

export const showRemoveModal = (post: IPost) => 
    showModal(modal.REMOVE_POST)(post);

export const closeModal = () => ({
    type: actions.HIDE_MODAL
});