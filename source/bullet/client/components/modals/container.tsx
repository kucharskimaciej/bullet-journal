import * as React from 'react';
import {Component, PropTypes} from 'react';
import {composeWithTracker} from 'react-komposer';

const styles = require('./modal.styl');

import {UpdateModal} from './update_modal';

export interface IModalProps {
    type?: string;
    data?: any;
}

const Container = (props) => {
    if (!props.type) {
        return null;
    }

    return <Modal {...props} />;
};

class Modal extends Component<IModalProps, {}> {
    private _scrollFn;

    onClose() {
        Session.set('MODAL_TYPE', null);
        Session.set('MODAL_DATA', null);
    }

    lockScroll(x, y) {
       return () => {
           window.scrollTo(x, y);
       };
    }

    componentDidMount() {
        this._scrollFn = this.lockScroll(window.pageXOffset, window.pageYOffset);
        window.addEventListener('scroll', this._scrollFn);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._scrollFn);
    }

    render() {
        const {data, type} = this.props;

        let contentComponent;
        switch (type) {
            case 'UPDATE_POST':
                contentComponent = <UpdateModal close={this.onClose} post={data} />;
                break;
            default:
                contentComponent = null;
        }

        return (
            <div className={styles.overlay}>
                <section className={styles.modal}>
                    <aside className={styles.close} onClick={this.onClose}>×</aside>
                    {contentComponent}
                </section>
            </div>
        );
    }
}

export default composeWithTracker((_, onData) => {
    const data = Session.get('MODAL_DATA');
    const type = Session.get('MODAL_TYPE');

    onData(null, { data, type });
})(Container);