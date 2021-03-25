import React, { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import paths from '../Routes/paths';

import { verifyUser } from '../Actions';

import { FormControl, Input, FormHelperText, Button, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import './Login.css';

const FormLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();

    if (validEmail && validPassword) {
      dispatch(verifyUser(email, password));
      console.log(email)
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

    if (value && value.length > 6) {
      setValidPassword(true)
      setError('')
    } else {
      setError('Password less than 6')
    }

    switch (name) {
      case 'password':
        setPassword(value);
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
    <>
      <form className="login-form" onSubmit={onLogin}>
        <div>
          <FormControl fullWidth required>
            <Input onChange={onChangeEmail} type="text" placeholder="E-mail adress" name="email" value={email} />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth required>
            <Input onChange={onChangePassword} type="password" placeholder="Password" name="password" value={password} />
          </FormControl>
        </div>
        <Snackbar autoHideDuration={3000} open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            {error}
          </Alert>
        </Snackbar>
        <Button type="submit" variant='contained' color='primary' size=''>Sign in</Button>
        <Link to='/registration' className='adress'><p>Registration</p></Link>
      </form>
    </>
  )
}

export default FormLogin;
