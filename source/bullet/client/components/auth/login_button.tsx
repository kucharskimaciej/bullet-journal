import {Component, PropTypes} from 'react';
import * as React from 'react';

import {Button} from '../common/button';

const styles = require('./login_button.styl');

export interface ILoginButtonProps {
    onBtnClick: (e: Event) => void;
}

export class LoginButton extends Component<ILoginButtonProps, {}> {
    static propTypes = {
        onBtnClick: PropTypes.func.isRequired
    };

    render() {
        return (
            <span className={styles.buttonWrapper}>
                <Button onClick={this.props.onBtnClick}>
                    {this.props.children}
                </Button>
            </span>
        );
    }
}