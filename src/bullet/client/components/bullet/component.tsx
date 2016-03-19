import {Component, PropTypes} from 'react';

import {compose} from './compose';
import {firstName} from '../../services/users';
import {Login} from '../login';
import {IPost} from '../../../collections/posts/posts';
import {IUser} from '../../../collections/users/users';

export interface IBulletProps {
    posts: IPost[];
    user: IUser|void;
    isLoggedIn: boolean;
}

class BulletComponent extends Component<IBulletProps> {
    static propTypes = {
        user: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired
    };

    render() {
        const {user, isLoggedIn} = this.props;
        let userFragment, loginFragment;

        if (isLoggedIn) {
            userFragment = <span>, {firstName(user)}!</span>;
        } else {
            loginFragment = <Login service='facebook'/>;
        }

        console.log(this.props.posts);
        return <section>
            <h1>
                Hello{userFragment}
        </h1>
        {loginFragment}
        </section>;
    }
}

export const Bullet = compose(BulletComponent);
