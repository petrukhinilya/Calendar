import React from 'react'
import './Pages.css'
import { Link } from 'react-router-dom'
// import FormRegister from './FormRegister'
import FormLogin from '../Components/FormLogin'
import { getToken } from '../utils/utils';
import { Redirect } from 'react-router-dom'

const Loginpage = () => {
  // const isAuthenticated = localStorage.getItem('token');
  // if (isAuthenticated) {
  //   <Redirect to={{ pathname: '/calendar' }}></Redirect>
  // } else {
    return (<div className="login-page">
      <div className="form">
        <FormLogin />
        <Link to='/registration' className='adress'><p>Registration</p></Link>
      </div>
    </div>)
  }
// }

export default Loginpage