import * as React from 'react';
import {Component, PropTypes} from 'react';

import {fullName} from '../../services/users';

import {IUser} from '../../../collections/users/users';

import {Avatar} from './avatar';

export interface IAccountProps {
    profile: IUser;
}

const styles = require('./account.styl');

export class Account extends Component<IAccountProps, {}> {
    static propTypes = {
        profile: PropTypes.object.isRequired
    };

    render() {
        const {profile} = this.props;

        return (
            <div className={styles.root}>
                <span className={styles.picture}>
                    <Avatar user={profile} />
                </span>
                <span>
                    <span className={styles.username}>{fullName(profile)}</span>
                    <a href="/logout"><i className={styles.icon} />Logout</a>
                </span>
            </div>
        );
    }
}