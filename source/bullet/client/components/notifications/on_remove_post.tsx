import * as React from 'react';
import {Component, PropTypes} from 'react';
import {IPost} from '../../../collections/posts/posts';

const styles = require('./notification.styl');

export interface IRemovePostProps {
    close: any;
    post: IPost;
}

export class RemovePostNotification extends Component<IRemovePostProps, {}> {

    onUndo = () => {
        Meteor.call('removePost', this.props.post, () => {
            this.props.close();
        });
    };

    onConfirm = () => {
        this.props.close();
    };

    render() {
        return (
            <section className={styles.root}>
                <article className={styles.body}>
                    <p>
                        It seems that you have removed a post. Was that what you wanted to do?
                        <a onClick={this.onConfirm} class={styles.link}>Yeah, I meant to do that.</a>
                        <a onClick={this.onUndo} class={styles.link}>Oh noe, this was a mistake!</a>
                    </p>
                </article>
            </section>
        );
    }
}