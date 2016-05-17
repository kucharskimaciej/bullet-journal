import * as React from 'react';
import {Component, PropTypes, SyntheticEvent} from 'react';

import {PostPreview} from './preview';
import {PostForm} from './post_form';
import {fromJS} from 'immutable';

const styles = require('./post_editor.styl');

export interface IPostEditorState {
    title?: string;
    body?: string;
}

export interface IPostEditorProps {
    author: string;
}

export class PostEditor extends Component<IPostEditorProps, IPostEditorState> {
    private get initialState() {
        return {
            title: '',
            body: ''
        };
    }

    constructor() {
        super();
        this.state = this.initialState;
    }

    onChange = (data: {[fieldName: string]: any}) => {
        this.setState(data);
    };

    onSubmit = (form: any) => {
        if (form.isValid) {
            Meteor.call('createPost', this.state, () => {
                this.reset();
            });
        }
    };

    private reset() {
        this.setState(this.initialState);
    }


    render() {
        const {author} = this.props;

        return (
            <section className={styles.root}>
                <PostForm fields={this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
                <PostPreview {...this.state} author={author} />
            </section>
        );
    }


}