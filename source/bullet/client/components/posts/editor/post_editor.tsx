import * as React from 'react';
import {Component, PropTypes, SyntheticEvent} from 'react';

import {Post} from '../post';
import {PostForm} from './post_form';

export interface IPostEditorState {
    title?: string;
    body?: string;
}

export interface IPostEditorProps {
    author: string;
}

export class PostEditor extends Component<IPostEditorProps, IPostEditorState> {
    constructor() {
        super();
        this.state = {
            title: '',
            body: ''
        };
    }

    onChange = (name: string) => {
        return (event: SyntheticEvent) => {
            const target = event.target as HTMLInputElement;
            if (name in this.state) {
                const newState = Object.assign({}, this.state, {
                    [name]: target.value
                });

                this.setState(newState);
            }
        };
    };

    onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    render() {
        const {author} = this.props;

        return (
            <section>
                <PostForm {...this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
                <Post {...this.state} created_at={Date.now()} isPreview={true} author={author} />
            </section>
        );
    }


}