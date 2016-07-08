import * as React from 'react';
import {Component, PropTypes} from 'react';
import {compose} from 'react-komposer';
import {IAppState} from "../../reducers/index";
import store from "../../store";
import {notification} from '../../constants';

const styles = require('./notification.styl');

import {dismissNotification} from '../../actions/notifications';
import {RemovePostNotification} from './on_remove_post';

export interface IModalProps {
    type?: string;
    data?: any;
}

class Container extends Component<IModalProps, any> {
    render() {
        if (!this.props.type) {
            return null;
        }

        return <Modal {...this.props} />;
    }
}

class Modal extends Component<IModalProps, {}> {
    private _scrollFn;

    onClose() {
        store.dispatch(dismissNotification());
    }


    render() {
        const {data, type} = this.props;

        let contentComponent;
        switch (type) {
            case notification.ON_REMOVE_POST:
                contentComponent = <RemovePostNotification close={this.onClose} post={data} />;
                break;
            default:
                contentComponent = null;
        }

        return (
            <aside className={styles.container}>
                <section className={styles.notification}>
                    {contentComponent}
                </section>
            </aside>
        );
    }
}


export default compose((_, onData) => {
    onData(null, {});

    store.subscribe(() => {
        const state: IAppState = store.getState();
        onData(null, state.notification);
    });
})(Container);

