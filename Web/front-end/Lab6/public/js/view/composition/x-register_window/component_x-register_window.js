import React, { useState } from 'react';
import XButton from './../../component/x-button/component.js';
import XInput from './../../component/x-input/component.js';
import XText from './../../component/x-text/component.js';
import { UserFactory } from '../../../domain/service.js';
import { RouterFactory } from './../../route/router.js';

function XRegisterWindow() {
  const [message, setMessage] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegisterClick = async () => {
    const user = UserFactory.createInstance();
    user.setUser(login, password, email);
    const result = await user.registerQuery();
    if (result.status === 200) {
      setMessage('Register is complete! Please, go back to login.');
    } else if (result.status === 401) {
      setMessage('User already exist! Try another login or email.');
    } else {
      setMessage('Server error! Try again.');
    }
  };

  const handleBackClick = () => {
    const router = RouterFactory.createInstance();
    router.go('login');
  };

  return (
    <>
      <XButton onClick={handleRegisterClick}>Register</XButton>
      <XInput value={login} onChange={(event) => setLogin(event.target.value)} />
      <XInput value={password} onChange={(event) => setPassword(event.target.value)} />
      <XInput value={email} onChange={(event) => setEmail(event.target.value)} />
      <XButton onClick={handleRegisterClick}>Add</XButton>
      <XText>{message}</XText>
      <XButton onClick={handleBackClick}>Back</XButton>
    </>
  );
}

export default XRegisterWindow;
