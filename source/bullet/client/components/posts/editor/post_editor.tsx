import * as React from 'react';
import {Component, PropTypes, SyntheticEvent} from 'react';

import {Post} from '../post';
import {PostForm} from './post_form';
import {fromJS} from 'immutable';

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
            this.reset();
        }
    };

    private reset() {
        this.setState(this.initialState);
    }


    render() {
        const {author} = this.props;

        return (
            <section>
                <PostForm fields={this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
                <Post {...this.state} created_at={Date.now()} isPreview={true} author={author} />
            </section>
        );
    }


}