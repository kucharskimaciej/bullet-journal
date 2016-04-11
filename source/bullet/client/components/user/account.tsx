import * as React from 'react';
import {Component, PropTypes} from 'react';

import {fullName, avatarUrl} from '../../services/users';

import {IUser} from '../../../collections/users/users';

export interface IAccountProps {
    profile: IUser;
}

export class Account extends Component<IAccountProps, {}> {
    static propTypes = {
        profile: PropTypes.object.isRequired
    };

    render() {
        const {profile} = this.props;

        return (
            <div>
                <h4>{fullName(profile)}</h4>
                <a href="/logout">Logout</a>
            </div>
        );
    }
}