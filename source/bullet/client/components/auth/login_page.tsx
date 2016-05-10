import * as React from 'react';
import {Component, PropTypes} from 'react';

import {withFacebook} from '../../services/auth';
import {withGithub} from "../../services/auth";

import {LoginButton} from './login_button';
const styles = require('./login_page.styl');


export class LoginPage extends Component<{}, {}> {
    private get login() {
        return {
            facebook: withFacebook,
            github: withGithub
        };
    }

    onLogin(serviceName: string) {
        return () => {
            event.preventDefault();
            this.login[serviceName]();
        };
    }

    render() {
        return (
          <section className={styles.page}>
              <h1>Nice to see you...</h1>
              <LoginButton onBtnClick={this.onLogin('facebook')}>Facebook</LoginButton>
              <LoginButton onBtnClick={this.onLogin('github')}>Github</LoginButton>
          </section>
        );
    }
}