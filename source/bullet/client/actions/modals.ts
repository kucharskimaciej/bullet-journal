import {IPost} from "../../collections/posts/posts";

const showModal = (type: string) => data => ({
    type: 'SHOW_MODAL' ,
    payload: {
        type, data
    }
});

export const showUpdateModal = (post: IPost) => showModal('UPDATE_MODAL')(post);
export const showRemoveModal = (post: IPost) => showModal('REMOVE_MODAL')(post);

export const closeModal = () => ({
    type: 'HIDE_MODAL'
});