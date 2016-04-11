import {Component, PropTypes} from 'react';
import * as React from 'react';


export interface ILoginButtonProps {
    onBtnClick: (e: Event) => void;
}

export class LoginButton extends Component<ILoginButtonProps, {}> {
    static propTypes = {
        onBtnClick: PropTypes.func.isRequired
    };

    render() {
        return <button onClick={this.props.onBtnClick}>{this.props.children}</button>;
    }
}