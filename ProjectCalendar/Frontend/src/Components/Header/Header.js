import React from 'react'
import './styled.css'
import {useSelector} from 'react-redux'
import { deleteToken } from '../../utils/utils';
import { useHistory } from "react-router-dom";
import paths from '../../Routes/paths'

const Header = () => {
  const history = useHistory();
  const useName = ({users}) => (users)
  const {name} = useSelector(useName);

  const onLogout = () => {
    deleteToken()
    history.push(paths.registration)
  }


    return (<div className= 'header'>
      <p>{name}</p>
      <button onClick={onLogout}>Logout</button>
    </div>)
  }

export default Header