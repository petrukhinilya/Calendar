import React from 'react'
import './Pages.css'
import { Link } from 'react-router-dom'

import FormLogin from '../Components/FormLogin'


const Loginpage = () => {

  return (<div className='wrapper'>
    <div className="login-page">
      <div className="form">
        <FormLogin />
        <Link to='/registration' className='adress'><p>Registration</p></Link>

      </div>
    </div>
  </div>)
}

export default Loginpage