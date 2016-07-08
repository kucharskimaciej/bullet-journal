import * as actions from './constants';
import {notification} from '../constants';
import {IPost} from "../../collections/posts/posts";

const showNotification = (type: string) => data => ({
    type: actions.SHOW_NOTIFICATION,
    payload: {
        type, data
    }
});

export const dismissNotification = () => ({ type: actions.DISMISS_NOTIFICATION });

export const showPostRemoveNotification = showNotification(notification.ON_REMOVE_POST);