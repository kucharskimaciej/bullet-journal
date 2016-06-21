import * as actions from '../actions/constants';

export interface IModalState {
    type?: string;
    data?: any;
}

export interface IModalActionPayload {
    type: string;
    payload: IModalState;
}

export default function (state: IModalState = {}, action: IModalActionPayload) {
    switch (action.type) {
        case actions.SHOW_MODAL:
            return {
                type: action.payload.type,
                data: action.payload.data
            };

        case actions.HIDE_MODAL:
            return {};

        default:
            return state;
    }
}