import {combineReducers} from 'redux';
import modal, {IModalState} from './modal';

export interface IAppState {
    modal: IModalState;
}

export default combineReducers({
    modal
});