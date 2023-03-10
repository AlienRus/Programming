import React from 'react';
import XButton from './../../component/x-button/component.js';
import XInput from './../../component/x-input/component.js';
import XText from './../../component/x-text/component.js';
import { UserFactory } from '../../../domain/service.js';
import { RouterFactory } from './../../route/router.js';

class XLoginWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
  }

  async handleLogin(event) {
    event.stopPropagation();
    const login = this.loginInput.getValue();
    const password = this.passwordInput.getValue();
    const user = UserFactory.createInstance();
    user.setUser(login, password, undefined);
    const result = await user.authQuery();
    if (result.status === 200) {
      localStorage.setItem('AutoSellUserToken', JSON.stringify(result.data));
      this.setState({ message: 'Logined! Please, wait for response...' });
      const router = RouterFactory.createInstance();
      router.go('main');
    } else if (result.status === 401) {
      this.setState({ message: 'Failed to Login! Invalid Login or Password.' });
    } else {
      this.setState({ message: 'Server error! Try again.' });
    }
  }

  handleRegister(event) {
    event.stopPropagation();
    const router = RouterFactory.createInstance();
    router.go('register');
  }

  render() {
    return (
      <div>
        <XText>{this.state.message}</XText>
        <XInput ref={(input) => {this.loginInput = input}} label="Login:" type="text" />
        <XInput ref={(input) => {this.passwordInput = input}} label="Password:" type="password" />
        <XButton onClick={this.handleLogin.bind(this)}>Login</XButton>
        <XButton onClick={this.handleRegister.bind(this)}>Register</XButton>
      </div>
    );
  }
}

export default XLoginWindow;
