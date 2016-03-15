import {Component, PropTypes} from 'react';
const {composeWithTracker} = require('react-komposer');

import LoginService from '../services/login';
console.log(LoginService);

class LoginComponent extends Component {
    static propTypes = {
        userId: PropTypes.string,
        service: PropTypes.string.isRequired
    };

    login = (e:Event) => {
        e.preventDefault();
        switch(this.props.service) {
            case 'facebook': return LoginService.withFacebook();
        }
    };

    render() {
        return <a onClick={this.login}>facebook</a>
    }
}

export const Login = composeWithTracker((props, onData) => {
    onData(null, {service: props.service, userId: Meteor.userId()});
})(LoginComponent);