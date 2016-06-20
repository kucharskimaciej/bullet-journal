import {Store, createStore, applyMiddleware} from 'redux';
import * as createLogger from 'redux-logger';

import reducers, {IAppState} from './reducers/index';

const configureStore = () => {
    const middlewares = [];

    if (Meteor.settings['public']['env'] === 'DEVELOPMENT') {
        middlewares.push(createLogger());
    }

    return <Store<IAppState>>createStore(
        reducers,
        applyMiddleware(...middlewares)
    );
};

export default configureStore();