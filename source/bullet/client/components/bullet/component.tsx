import {Component, PropTypes} from 'react';
import * as React from 'react';

import {compose} from './compose';
import {IPost} from '../../../collections/posts/posts';
import {IUser} from '../../../collections/users/users';

import {RecentPosts} from '../posts/recent_posts';
import {Sidebar} from '../sidebar/sidebar';

export interface IBulletProps {
    posts: IPost[];
    user?: IUser;
    isLoggedIn: boolean;
}

interface IStateless {}

class BulletComponent extends Component<IBulletProps, any> {
    static propTypes = {
        user: PropTypes.object,
        posts: PropTypes.array.isRequired,
        isLoggedIn: PropTypes.bool.isRequired
    };

    render() {
        const {posts, isLoggedIn, user} = this.props;

        let renderSidebar;
        if (isLoggedIn) {
            renderSidebar = <Sidebar profile={user} />;
        }

        return (
            <section>
                {renderSidebar}
                <RecentPosts posts={posts} />
            </section>
        );
    }
}

export const Bullet = compose(BulletComponent);
