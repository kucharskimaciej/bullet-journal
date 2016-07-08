import * as React from 'react';
import {Component, PropTypes} from 'react';

import {IPost} from '../../../collections/posts/posts';

import {Post} from './post';

const styles = require('./recent_posts.styl');

export interface IRecentPostsProps {
    posts: IPost[];
}

export class RecentPosts extends Component<IRecentPostsProps, {}> {
    static propTypes = {
        posts: PropTypes.array.isRequired
    };

    render() {
        const {posts} = this.props;
        if(posts.length) {
            let postsPartial = posts.map((post: IPost) => <Post key={post._id} {...post} />);

            return (
                <section className={styles.root}>
                    {postsPartial}
                </section>
            );
        } else {
            return <section>No posts yet</section>;
        }
    }
}