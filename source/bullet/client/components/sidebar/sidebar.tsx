import * as React from 'react';
import {Component, PropTypes} from 'react';

import {IUser} from '../../../collections/users/users';

import {Account} from '../user/account';

export interface ISidebarProps {
    profile: IUser;
}

export class Sidebar extends Component<ISidebarProps, {}> {
    static propTypes = {
        profile: PropTypes.object.isRequired
    };

    render() {
        const {profile} = this.props;

        return (
            <aside role="sidebar">
                <Account profile={profile}/>
            </aside>
        );
    }
}