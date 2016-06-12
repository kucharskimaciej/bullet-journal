import {
    IActionHandler,
    createAction
} from '../action_creators';
import {IPost} from "../../collections/posts/posts";

export interface IShowModalActionPayload {
    type: string;
    data: any;
}

export interface IPostModalActionPayload {
    data: IPost;
}

const showModal = <IActionHandler<IShowModalActionPayload>>createAction('SHOW_MODAL', ({ type, data }) => {
    Session.set('MODAL_DATA', data);
    Session.set('MODAL_TYPE', type);
});

export const showUpdateModal = <IActionHandler<IPostModalActionPayload>>createAction('SHOW_UPDATE_MODAL', ({ data }) => {
    showModal({ type: 'UPDATE_POST', data });
});

export const showRemoveModal = <IActionHandler<IPostModalActionPayload>>createAction('SHOW_REMOVE_MODAL', ({data}) => {
    showModal({ type: 'REMOVE_POST', data });
});

export const closeModal = <IActionHandler<void>>createAction('CLOSE_MODAL', () => {
    Session.set('MODAL_DATA', null);
    Session.set('MODAL_TYPE', null);
});