import * as actions from '../actions/constants';

export interface INotificationState {
    type?: string;
    data?: any;
}

export interface INotificationActionPayload {
    type: string;
    payload: INotificationState;
}

export default function (state: INotificationState = {}, action: INotificationActionPayload) {
    switch (action.type) {
        case actions.SHOW_NOTIFICATION:
            return {
                type: action.payload.type,
                data: action.payload.data
            };

        case actions.DISMISS_NOTIFICATION:
            return {};

        default:
            return state;
    }
}