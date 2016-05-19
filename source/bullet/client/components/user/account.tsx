import * as React from 'react';
import {Component, PropTypes} from 'react';

import {fullName} from '../../services/users';

import {IUser} from '../../../collections/users/users';

import {Avatar} from './avatar';

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
                <span>
                    <Avatar user={profile} />
                </span>
                {fullName(profile)}
                <a href="/logout">Logout</a>
            </div>
        );
    }
}