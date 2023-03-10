import React from 'react';
import XButton from './../../component/x-button/component.js';
import XInput from './../../component/x-input/component.js';
import XText from './../../component/x-text/component.js';
import { UserFactory } from '../../../domain/service.js';
import { RouterFactory } from './../../route/router.js';

function XRegisterWindow() {
  const [message, setMessage] = React.useState('');

  const handleRegisterClick = async () => {
    const login = document.querySelector('x-input:nth-of-type(1)').xValue;
    const password = document.querySelector('x-input:nth-of-type(2)').xValue;
    const email = document.querySelector('x-input:nth-of-type(3)').xValue;

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
      <XText>AutoSell</XText>
      <XInput />
      <XInput />
      <XInput />
      <XButton onClick={handleRegisterClick}>Register</XButton>
      <XButton
