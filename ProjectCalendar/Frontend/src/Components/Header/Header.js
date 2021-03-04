import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import { deleteToken } from '../../utils/utils';

import paths from '../../Routes/paths';

import './styled.css';

const Header = () => {
  const history = useHistory();
  const useName = ({ users }) => (users);
  const { name } = useSelector(useName);

  const onLogout = () => {
    history.push(paths.login);
  }

  return (
    <div className='header'>
      <p>{name}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default Header;
