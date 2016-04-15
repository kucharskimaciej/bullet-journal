import * as React from 'react';
import {Component, PropTypes} from 'react';
import * as marked from 'marked';

import {IPost} from '../../../collections/posts/posts';

import {PostDate} from './post_date';


marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: false,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true
});

export interface IPostProps {
    title: string;
    body: string;
    created_at: number;
    isPreview?: boolean;
    author?: string;
    _id?: string;
    slug?: string;
}

export class Post extends Component<IPostProps, {}> {
    static propTypes = {
        _id: PropTypes.string,
        body: PropTypes.string.isRequired,
        title: PropTypes.string,
        isPreview: PropTypes.bool
    };

    render() {
        const {body, title, created_at} = this.props;
        const renderedBody = {
            __html: marked(body)
        };

        return (
            <article>
                <header>
                    <PostDate createdAt={created_at} />
                    { title ? <h2>{title}</h2> : null }
                </header>
                <div dangerouslySetInnerHTML={renderedBody}></div>
            </article>
        );
    }


}