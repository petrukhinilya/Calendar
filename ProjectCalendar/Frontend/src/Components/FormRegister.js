import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { addUser } from '../Actions';

import paths from '../Routes/paths';

import { FormControl, Input, FormHelperText, Button } from '@material-ui/core';

import './Login.css';

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

  const inputName = useRef('')
  const inputEmail = useRef('')
  const inputPassword = useRef('')
  const inputPassword2 = useRef('')


  const onSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.children)

    // const {
    //   target: {
    //     children: {
    //       password: {
    //         value: password
    //       },
    //       confirmPassword: {
    //         value: confirmPassword
    //       },
    //       name: {
    //         value: name
    //       },
    //       email: {
    //         value: email
    //       },
    //     }
    //   }
    // } = e;


    dispatch(addUser(inputName.current.value, inputEmail.current.value, inputPassword.current.value));
    history.push(paths.calendar);


    // if (password === confirmPassword && validEmail && validPassword) {
    //   dispatch(addUser(name, email, password));
    //   history.push(paths.calendar);
    // } else {
    //   alert(error)
    // }
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
        <FormControl fullWidth required >
          <FormHelperText>Name</FormHelperText>
          <Input onChange={onChange} type="text" placeholder="Name" name="name" value={name} inputRef={inputName}/>
        </FormControl>
        <FormControl fullWidth required>
          <FormHelperText>E-mail</FormHelperText>
          <Input onChange={onChangeEmail} type="text" placeholder="E-mail address" name="email" value={email} inputRef={inputEmail}/>
        </FormControl>
        <FormControl fullWidth required>
          <FormHelperText>Password</FormHelperText>
          <Input onChange={onChangePassword} type="password" placeholder="Password" name="password" value={password} inputRef={inputPassword}/>
        </FormControl>
        <FormControl fullWidth required>
          <FormHelperText>Password</FormHelperText>
          <Input onChange={onChangePassword} type="password" placeholder="Confirm password" name="confirmPassword" value={confirmPassword} inputRef={inputPassword2}/>
        </FormControl>
        <p>{error}</p>
        <button type='submit'>Sign up </button>
      </form>
    </div >
  )
}

export default FormRegister;
