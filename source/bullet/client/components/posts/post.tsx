import * as React from 'react';
import {Component, PropTypes} from 'react';

import {IPost} from '../../../collections/posts/posts';

import {PostDate} from './post_date';


export class Post extends Component<IPost, {}> {
    static propTypes = {
        _id: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        title: PropTypes.string,
    };

    render() {
        const {body, title, created_at} = this.props;

        return (
            <article>
                <header>
                    <PostDate createdAt={created_at} />
                    { title ? <h2>{title}</h2> : null }
                </header>
                <div>
                    {body}
                </div>
            </article>
        );
    }


}