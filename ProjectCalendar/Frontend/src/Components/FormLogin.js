import React from 'react'
import './Login.css'
import paths from '../Routes/paths'
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { verifyUser } from '../Actions';


const FormLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = (e) => {
    e.preventDefault()
    const { target: { children: {
      password: { value: password },
      email: { value: email }
    } } } = event

    dispatch(verifyUser(email, password))
    history.push(paths.calendar)
  }
  const onChange = (event) => {
    const { target: { name, value } } = event

    switch (name) {
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      default:
        break
    }
  }
  return (<div>
    <form className="login-form" onSubmit={onLogin}>
      <input onChange={onChange} type="text" placeholder="E-mail adress" name="email" value={email} />
      <input onChange={onChange} type="password" placeholder="Password" name="password" value={password} />
      <button type="submit">Sign in</button>
      {/* <NavLink to='/calendar'>Sign in</NavLink> */}
    </form>
  </div>)
}

export default FormLogin
