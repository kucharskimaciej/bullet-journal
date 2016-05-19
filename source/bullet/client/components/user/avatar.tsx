import * as React from 'react';
import {Component, PropTypes} from 'react';

import {avatarUrl} from '../../services/users';

import {IUser} from '../../../collections/users/users';

export interface IAvatarProps {
    user: IUser;
}

const styles = require('./avatar.styl');

export class Avatar extends Component<IAvatarProps, {}> {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        const {user} = this.props;
        const url = avatarUrl(user);

        return (
            <figure className={styles.root} data-avatar={url}>
              <img className={styles.image} src={url} />
            </figure>
        );
    }
}