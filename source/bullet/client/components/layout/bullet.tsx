import * as React from 'react';
import {Component, PropTypes} from 'react';

import {BulletHeader} from './bullet_header';

export interface IBulletLayoutProps {
    headerSize?: string;
}
const styles = require('./bullet.styl');


export class BulletLayout extends Component<IBulletLayoutProps, {}> {
    render() {
        const {children, headerSize} = this.props;

        return (
            <div className={styles.container}>
                <BulletHeader size={headerSize}/>
                <section role='main'>{children}</section>
            </div>
        );
    }
}