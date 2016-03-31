import {Component, PropTypes} from 'react';
import * as React from 'react';

import {withFacebook} from '../services/auth';
import {withGithub} from "../services/auth";


export class Login extends Component<{service: string}, {}> {
    static propTypes = {
        service: PropTypes.string.isRequired
    };

    login = (e: Event) => {
        e.preventDefault();
        switch (this.props.service) {
            case 'facebook': return withFacebook();
            case 'github': return withGithub();
        }
    };

    render() {
        return <a onClick={this.login}>facebook</a>;
    }
}