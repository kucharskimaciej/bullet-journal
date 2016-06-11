import {
    IActionHandler,
    createAction
} from '../action_creators';
import {IPost} from "../../collections/posts/posts";

export interface IShowModalActionPayload {
    type: string;
    data: any;
}

export interface IUpdateModalActionPayload {
    data: IPost;
}

const showModal = <IActionHandler<IShowModalActionPayload>>createAction('SHOW_MODAL', ({ type, data }) => {
    Session.set('MODAL_DATA', data);
    Session.set('MODAL_TYPE', type);
});

export const showUpdateModal = <IActionHandler<IUpdateModalActionPayload>>createAction('SHOW_UPDATE_MODAL', ({ data }) => {
    showModal({ type: 'UPDATE_POST', data });
});