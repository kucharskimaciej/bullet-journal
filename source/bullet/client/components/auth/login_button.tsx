import {Component, PropTypes} from 'react';
import * as React from 'react';

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
                <a className={styles.button} onClick={this.props.onBtnClick}>
                    <span>{this.props.children}</span>
                </a>
            </span>
        );
    }
}