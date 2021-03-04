import React from 'react';
import { Link } from 'react-router-dom';

import FormRegister from '../Components/FormRegister';

import './Pages.css';

const RegistrationPage = () => (
  <div className="login-page">
    <div className="form">
      <FormRegister />
      <Link to='/login' className='adress'><p>Login</p></Link>
    </div>
  </div>
)

export default RegistrationPage;
