import React from 'react'
import './Pages.css'
import { Link } from 'react-router-dom'
// import FormRegister from './FormRegister'
import FormLogin from '../Components/FormLogin'
import { getToken } from '../utils/utils';

const Loginpage = () => {
  console.log(getToken())
  return (<div className="login-page">
  <div className="form">
    <FormLogin />
    <Link to='/registration' className='adress'><p>Registration</p></Link>
  </div>
</div>)
}

export default Loginpage