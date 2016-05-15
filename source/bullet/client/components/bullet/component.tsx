import {Component, PropTypes} from 'react';
import * as React from 'react';

import {compose} from './compose';
import {IPost} from '../../../collections/posts/posts';
import {IUser} from '../../../collections/users/users';

import {RecentPosts} from '../posts/recent_posts';
import {PostEditor} from '../posts/editor/post_editor';
import {Sidebar} from '../sidebar/sidebar';

const styles = require('./component.styl');

export interface IBulletProps {
    posts: IPost[];
    user?: IUser;
    isLoggedIn: boolean;
}

interface IStateless {}

export class BulletComponent extends Component<IBulletProps, any> {
    static propTypes = {
        user: PropTypes.object,
        posts: PropTypes.array.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
    };

    renderSidebar() {
        const {isLoggedIn, user} = this.props;

        if (!isLoggedIn) {
            return null;
        }
        return <Sidebar profile={user} />;
    }

    render() {
        const {posts, user} = this.props;

        return (
            <section className={styles.root}>
                {this.renderSidebar()}
                <div className={styles.main}>
                    <PostEditor author={user._id} />
                    <RecentPosts posts={posts} />
                </div>
            </section>
        );
    }
}

export const Bullet = compose(BulletComponent);
