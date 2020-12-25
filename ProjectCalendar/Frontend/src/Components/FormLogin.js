import React from 'react'
import './Login.css'

const FormLogin = () => {
  return (<div>
    <form className="login-form">
      <input type="text" placeholder="E-mail adress" />
      <input type="password" placeholder="Password" />
      <button type="submit">Sign in</button>
    </form>
  </div>)
}

export default FormLogin
