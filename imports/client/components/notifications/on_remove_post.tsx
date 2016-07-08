import {Meteor} from 'meteor/meteor';
import * as React from 'react';
import {Component, PropTypes} from 'react';
import {IPost} from '../../../collections/posts/posts';
import {SecondaryButton, WarningButton} from '../ui/button/button';

const styles = require('./notification.styl');

export interface IRemovePostProps {
    close: any;
    timeout?: number;
    post: IPost;
}

export class RemovePostNotification extends Component<IRemovePostProps, {}> {
    static defaultTimeout = 10;
    private dismissAction: number;

    onConfirm = () => {
        Meteor.call('deletePost', this.props.post, this.props.close);
    };

    onUndo = () => {
        clearTimeout(this.dismissAction);
        Meteor.call('undoRemovePost', this.props.post, this.props.close);
    };

    componentDidMount() {
        const {timeout} = this.props;
        this.dismissAction = setTimeout(this.onConfirm, (timeout || RemovePostNotification.defaultTimeout) * 1000);
    }

    render() {
        return (
            <section className={styles.root}>
                <article className={styles.body}>
                    <p>
                        It seems that you have removed a post. Was that what you wanted to do?
                    </p>
                        <SecondaryButton btnSize='small' onClick={this.onConfirm} className={styles.action}>Yeah, I meant to do that.</SecondaryButton>
                        <WarningButton btnSize='small' onClick={this.onUndo} className={styles.action}>Oh noe, this was a mistake!</WarningButton>
                </article>
            </section>
        );
    }
}