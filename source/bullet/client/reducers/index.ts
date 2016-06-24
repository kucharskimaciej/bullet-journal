import {combineReducers} from 'redux';
import modal, {IModalState} from './modal';
import notification, {INotificationState} from './notification';

export interface IAppState {
    modal: IModalState;
    notification: INotificationState;
}

export default combineReducers({
    modal,
    notification
});