import React from 'react'
import './Pages.css'
import { Link } from 'react-router-dom'
// import FormRegister from './FormRegister'
import FormLogin from '../Components/FormLogin'

const Loginpage = () => (
    <div className ="login-page">
    <div className ="form">
        <FormLogin />
        <Link to='/registration' className='adress'><p>Registration</p></Link>
    </div>
  </div>
)

export default Loginpage
