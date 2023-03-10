import { useState } from 'react';

import XButton from './../../component/x-button/component.js';
import XInput from './../../component/x-input/component.js';
import XText from './../../component/x-text/component.js';

import { UserFactory } from '../../../domain/service.js';
import { RouterFactory } from './../../route/router.js';

function XLoginWindow() {
  const [message, setMessage] = useState('');

  async function handleLogin(event) {
    event.stopPropagation();
    const login = event.target.parentElement.querySelector('x-input:nth-child(1)').value;
    const password = event.target.parentElement.querySelector('x-input:nth-child(2)').value;
    const user = UserFactory.createInstance();
    user.setUser(login, password, undefined);
    const result = await user.authQuery();
    if (result.status === 200) {
      localStorage.setItem('AutoSellUserToken', JSON.stringify(result.data));
      setMessage('Logined! Please, wait for pesponse...');
      const router = RouterFactory.createInstance();
      router.go('main');
    } else if (result.status === 401) {
      setMessage('Failed to Login! Invalid Login or Password.');
    } else {
      setMessage('Server error! Try again.');
    }
  }

  function handleRegister(event) {
    event.stopPropagation();
    const router = RouterFactory.createInstance();
    router.go('register');
  }

  return (
    <>
      <XText>AutoSell</XText>
      <XInput />
      <XInput />
      <XButton onClick={handleLogin}>Login</XButton>
      <XButton onClick={handleRegister}>Register</XButton>
      <XText>{message}</XText>
    </>
  );
}

export default XLoginWindow;
