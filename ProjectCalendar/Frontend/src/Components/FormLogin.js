import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import paths from '../Routes/paths';

import { verifyUser } from '../Actions';

import { FormControl, Input, FormHelperText, Button, TextField } from '@material-ui/core';

import './Login.css';

const FormLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();

    if (validEmail && validPassword) {
      dispatch(verifyUser(email, password));
      history.push(paths.calendar);
    } else {
      alert('Handle error')
    }
  }

  const onChangeEmail = (event) => {
    const { target: { name, value } } = event;

    let lastAtPos = value.lastIndexOf('@');
    let lastDotPos = value.lastIndexOf('.');

    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') == -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2) && value) {
      setError('Email should have @ and .')
    } else {
      setValidEmail(true)
      setError('')
    }

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      default:
        break;
    }
  }
  const onChangePassword = (event) => {
    const { target: { name, value } } = event;

    if (value && value.length > 6) {
      setValidPassword(true)
      setError('')
    } else {
      setError('Password should be more than 6')
    }

    switch (name) {
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={onLogin}>
        <FormControl fullWidth required>
          <FormHelperText>E-mail</FormHelperText>
          <Input onChange={onChangeEmail} type="text" placeholder="E-mail adress" name="email" value={email} />
        </FormControl>
        <FormControl fullWidth required>
          <FormHelperText>Password</FormHelperText>
          <Input onChange={onChangePassword} type="password" placeholder="Password" name="password" value={password} />
        </FormControl>
        <p>{error}</p>
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  )
}

export default FormLogin;
