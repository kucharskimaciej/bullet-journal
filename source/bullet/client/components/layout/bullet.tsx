import * as React from 'react';
import {Component, PropTypes} from 'react';

import {BulletHeader} from './bullet_header';

export interface IBulletLayoutProps {
    headerSize?: string;
}

export class BulletLayout extends Component<IBulletLayoutProps, {}> {
    render() {
        const {children, headerSize} = this.props;

        return (
            <div>
                <BulletHeader size={headerSize}/>
                <section role='main'>{children}</section>
            </div>
        );
    }
}