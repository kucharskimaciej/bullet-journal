import {IPost} from "../../collections/posts/posts";
import * as actions from './constants';
import {modal} from '../constants';
import {Action} from 'redux';

export interface ModalAction extends Action {
    type: string;
    payload?: {
        type: string,
        data: any;
    };
}

const showModal = (type: string) => data => (<ModalAction>{
    type: actions.SHOW_MODAL,
    payload: {
        type, data
    }
});

export const showUpdateModal = (post: IPost) => 
    showModal(modal.UPDATE_POST)(post);

export const showRemoveModal = (post: IPost) =>
    showModal(modal.REMOVE_POST)(post);

export const closeModal = () => (<ModalAction>{
    type: actions.HIDE_MODAL
});