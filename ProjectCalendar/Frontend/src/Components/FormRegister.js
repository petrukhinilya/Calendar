import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { addUser } from '../Actions';

import paths from '../Routes/paths';

import { FormControl, Input, FormHelperText, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

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
  const [open, setOpen] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name)
    console.log(email)
    console.log(password)

    if (validEmail && validPassword && password === confirmPassword) {
      setOpen(false)
      dispatch(addUser(name, email, password));
      history.push(paths.calendar);
    } else {
      setOpen(true);
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

    if (value && value.length > 6) {
      setValidPassword(true)
      setError('')
    } else {
      setError('Password less than 6')
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth required >
          <FormHelperText>Name</FormHelperText>
          <Input onChange={onChange} type="text" placeholder="Name" name="name" value={name} />
        </FormControl>
        <FormControl fullWidth required>
          <FormHelperText>E-mail</FormHelperText>
          <Input onChange={onChangeEmail} type="text" placeholder="E-mail address" name="email" value={email} />
        </FormControl>
        <FormControl fullWidth required>
          <FormHelperText>Password</FormHelperText>
          <Input onChange={onChangePassword} type="password" placeholder="Password" name="password" value={password} />
        </FormControl>
        <FormControl fullWidth required>
          <FormHelperText>Password</FormHelperText>
          <Input onChange={onChangePassword} type="password" placeholder="Confirm password" name="confirmPassword" value={confirmPassword} />
        </FormControl>
        <Snackbar autoHideDuration={3000} open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            {error}
          </Alert>
        </Snackbar>
        <button type='submit'>Sign up </button>
      </form>
    </div >
  )
}

export default FormRegister;
