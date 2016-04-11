import {Component, PropTypes} from 'react';
import * as React from 'react';

import {compose} from './compose';
import {firstName} from '../../services/users';
import {IPost} from '../../../collections/posts/posts';
import {IUser} from '../../../collections/users/users';

export interface IBulletProps {
    posts: IPost[];
    user?: IUser;
    isLoggedIn: boolean;
}

interface IStateless {}

class BulletComponent extends Component<IBulletProps, any> {
    static propTypes = {
        user: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired
    };

    render() {
        const {user, isLoggedIn} = this.props;
        let userFragment, loginFragment;

        if (isLoggedIn) {
            userFragment = <span>, {firstName(user)}!</span>;
        }

        return <section>
            <h1>
                Hello{userFragment}
        </h1>
        {loginFragment}
        </section>;
    }
}

export const Bullet = compose(BulletComponent);
