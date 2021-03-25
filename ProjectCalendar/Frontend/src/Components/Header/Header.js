import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import { deleteToken } from '../../utils/utils';

import { Button } from '@material-ui/core';

import paths from '../../Routes/paths';

import './styled.css';

const Header = () => {
  const history = useHistory();
  const useName = ({ users }) => (users);
  const { name } = useSelector(useName);

  const onLogout = () => {
    deleteToken()
    history.push(paths.login);
  }

  const styles = {
    buttons: {
      'font-weight': '700'
    }
  }

  return (
    <div>
      {/* <p>{name}</p> */}
      <Button onClick={onLogout} variant="contained"  style={styles.buttons}>Logout</Button>
    </div>
  )
}

export default Header;
