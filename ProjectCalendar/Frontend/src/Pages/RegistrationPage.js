import React from 'react'
import FormRegister from '../Components/FormRegister'
import './Pages.css'
import { Link } from 'react-router-dom'

const RegistrationPage = () => (
        <div className="login-page">
        <div className="form">
        <FormRegister />
        <Link to='/login' className='adress'><p>Login</p></Link>
        </div>
  </div>
)

export default RegistrationPage
