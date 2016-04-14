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

export class Post extends Component<IPost, {}> {
    static propTypes = {
        _id: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        title: PropTypes.string,
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