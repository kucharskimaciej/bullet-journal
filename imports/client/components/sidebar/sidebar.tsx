import * as React from 'react';
import {Component, PropTypes} from 'react';

import {IUser} from '../../../collections/users/users';

import {Account} from '../user/account';
import {GamificationContainer} from '../gamification/container';

const styles = require('./sidebar.styl');

export interface ISidebarProps {
    profile: IUser;
    className?: string;
}

export class Sidebar extends Component<ISidebarProps, {}> {
    static propTypes = {
        profile: PropTypes.object.isRequired
    };

    render() {
        const {profile} = this.props;

        return (
            <aside className={styles.root} role="sidebar">
                <Account profile={profile}/>
                <GamificationContainer />
            </aside>
        );
    }
}