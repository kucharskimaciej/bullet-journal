import {Meteor} from 'meteor/meteor';
import * as React from 'react';
import {Component, PropTypes} from 'react';
import {IPost} from '../../../collections/posts/posts';

const styles = require('./modal.styl');

export interface IRemoveModalProps {
    close: any;
    post: IPost;
}

export class RemoveModal extends Component<IRemoveModalProps, {}> {

    onRemove = () => {
        Meteor.call('removePost', this.props.post, () => {
            this.props.close();
        });
    };

    onCancel = () => {
        this.props.close();
    };

    render() {
        return (
            <section className={styles.root}>
                <header>
                    <h2 className={styles.title}>
                        Remove post
                    </h2>
                </header>
                <article className={styles.body}>
                    <p>Are you sure?</p>
                    <p>
                        <button onClick={this.onRemove}>Yes, remove it</button>
                        <button onClick={this.onCancel}>No, I like it</button>
                    </p>
                </article>
            </section>
        );
    }
}