import * as React from 'react';
import {Component, PropTypes} from 'react';
import {IPost} from '../../../collections/posts/posts';

const styles = require('./notification.styl');

export interface IRemovePostProps {
    close: any;
    timeout?: number;
    post: IPost;
}

export class RemovePostNotification extends Component<IRemovePostProps, {}> {
    static defaultTimeout = 10;

    onConfirm = () => {
        Meteor.call('deletePost', this.props.post, this.props.close);
    };

    onUndo = () => {
        Meteor.call('undoRemovePost', this.props.post, this.props.close);
    };

    componentDidMount() {
        const {timeout} = this.props;
        setTimeout(this.onConfirm, (timeout || RemovePostNotification.defaultTimeout) * 1000);
    }

    render() {
        return (
            <section className={styles.root}>
                <article className={styles.body}>
                    <p>
                        It seems that you have removed a post. Was that what you wanted to do?
                    </p>
                        <a onClick={this.onConfirm} className={styles.action}><span>Yeah, I meant to do that.</span></a>
                        <a onClick={this.onUndo} className={styles.action}><span>Oh noe, this was a mistake!</span></a>
                </article>
            </section>
        );
    }
}