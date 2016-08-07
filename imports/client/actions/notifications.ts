import * as actions from './constants';
import {notification} from '../constants';
import {IPost} from "../../collections/posts/posts";
import {Action} from 'redux';

export interface NotificationAction extends Action {
    type: string;
    payload?: {
        type: string,
        data: any;
    };
}

const showNotification = (type: string) => data => (<NotificationAction>{
    type: actions.SHOW_NOTIFICATION,
    payload: {
        type, data
    }
});

export const dismissNotification = () => (<NotificationAction>{ type: actions.DISMISS_NOTIFICATION });

export const showPostRemoveNotification = showNotification(notification.ON_REMOVE_POST);