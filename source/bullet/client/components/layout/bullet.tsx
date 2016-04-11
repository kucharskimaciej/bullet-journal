import * as React from 'react';
import {Component, PropTypes} from 'react';

export class BulletLayout extends Component<any, any> {
    render() {
        let {children, logoSize} = this.props;
        return (
            <div>
                <header>
                    <h1 className={logoSize}>.bullet</h1>
                </header>
                <section role='main'>{children}</section>
            </div>
        );
    }
}