import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import paths from '../Routes/paths';

import { verifyUser } from '../Actions';

import './Login.css';

const FormLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('Empty email or password');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();

    const {
      target: {
        children: {
          password: {
            value: password
          },
          email: {
            value: email
          },
        }
      }
    } = e;

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

    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') == -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2)) {
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

    if (value.length <= 6) {
      setError('Password should be more than 6')
    } else {
      setValidPassword(true)
      setError('')
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
        <input onChange={onChangeEmail} type="text" placeholder="E-mail adress" name="email" value={email} />
        <input onChange={onChangePassword} type="password" placeholder="Password" name="password" value={password} />
        <p>{error}</p>
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default FormLogin;
