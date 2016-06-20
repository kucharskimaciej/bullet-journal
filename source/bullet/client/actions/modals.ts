import {
    IActionHandler,
    createAction
} from '../action_creators';
import store from '../store';
import {IPost} from "../../collections/posts/posts";
import {IModalState} from "../reducers/modal";
import {Action} from 'redux';

export interface IShowModalActionPayload {
    type: string;
    data: any;
}

export interface IPostModalActionPayload {
    data: IPost;
}

const showModal = <IActionHandler<IShowModalActionPayload>>createAction('SHOW_MODAL', (payload: IShowModalActionPayload) => {
    store.dispatch({ type: 'SHOW_MODAL', payload });
});

export const showUpdateModal = <IActionHandler<IPostModalActionPayload>>createAction('SHOW_UPDATE_MODAL', ({ data }) => {
    showModal({ type: 'UPDATE_POST', data });
});

export const showRemoveModal = <IActionHandler<IPostModalActionPayload>>createAction('SHOW_REMOVE_MODAL', ({data}) => {
    showModal({ type: 'REMOVE_POST', data });
});

export const closeModal = <IActionHandler<void>>createAction('CLOSE_MODAL', () => {
    store.dispatch({ type: 'HIDE_MODAL' });
});