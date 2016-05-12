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
              <div className={styles.container}>
                  <h1 className={styles.prompt}>
                      Hello.
                      <small>What's new today?</small>
                  </h1>

                  <div className={styles.actions}>
                      <LoginButton onBtnClick={this.onLogin('facebook')}>continue with facebook</LoginButton>
                      <LoginButton onBtnClick={this.onLogin('github')}>continue with github</LoginButton>
                  </div>
              </div>
          </section>
        );
    }
}