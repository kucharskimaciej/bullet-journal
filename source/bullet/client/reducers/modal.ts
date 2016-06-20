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
        case 'SHOW_MODAL':
            return {
                type: action.payload.type,
                data: action.payload.data
            };

        case 'HIDE_MODAL':
            return {};

        default:
            return state;
    }
}