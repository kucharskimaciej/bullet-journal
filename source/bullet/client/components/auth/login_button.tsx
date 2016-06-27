import {Component, PropTypes} from 'react';
import * as React from 'react';

import {PrimaryButton} from '../ui/button/button';

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
                <PrimaryButton onClick={this.props.onBtnClick}>
                    {this.props.children}
                </PrimaryButton>
            </span>
        );
    }
}