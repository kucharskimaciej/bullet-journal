import * as React from 'react';
import {Component, PropTypes} from 'react';
import {IPost} from '../../../collections/posts/posts';
import {Post} from '../posts/post';
import {PostForm} from '../posts/editor/post_form';

const styles = require('./modal.styl');

export interface IUpdateModalProps {
    close: any;
    post: IPost;
}

export class UpdateModal extends Component<IUpdateModalProps, IPost> {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.post);
    }

    onChange = (data: {[fieldName: string]: any}) => {
        this.setState(data as IPost);
    };

    onSubmit = (form: any) => {
        if (form.isValid) {
            Meteor.call('updatePost', this.state, () => {
                this.props.close();
            });
        }
    };

    render() {
        return (
            <section className={styles.root}>
                <header>
                    <h2 className={styles.title}>Update post</h2>
                </header>
                <article className={styles.body}>
                    <PostForm fields={this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
                    <Post {...this.state} />
                </article>
            </section>
        );
    }
}