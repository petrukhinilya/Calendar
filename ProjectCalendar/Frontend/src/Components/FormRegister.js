import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { addUser } from '../Actions';

import paths from '../Routes/paths';

import './Registration.css';

const FormRegister = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const {
      target: {
        children: {
          password: {
            value: password
          },
          confirmPassword: {
            value: confirmPassword
          },
          name: {
            value: name
          },
          email: {
            value: email
          },
        }
      }
    } = e;

    if (password === confirmPassword && validEmail && validPassword) {
      dispatch(addUser(name, email, password));
      history.push(paths.calendar);
    } else {
      alert(error)
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

    if (value && value.length <= 6) {
      setError('Password should be more than 6')
    } else {
      setValidPassword(true)
      setError('')
    }

    switch (name) {
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  }

  const onChange = (event) => {
    const { target: { name, value } } = event;

    switch (name) {
      case 'name':
        setName(value);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder="Name" name="name" value={name} />
        <input onChange={onChangeEmail} type="text" placeholder="E-mail address" name="email" value={email} />
        <input onChange={onChangePassword} type="password" placeholder="Password" name="password" value={password} />
        <input onChange={onChangePassword} type="password" placeholder="Confirm password" name="confirmPassword" value={confirmPassword} />
        <p>{error}</p>
        <button type='submit'>Sign up </button>
      </form>
    </div>
  )
}

export default FormRegister;
