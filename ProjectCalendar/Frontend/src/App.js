import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Main from './Routes/Main';

import './App.css';

function App() {
  return (
    <>
      {/* <Redirect from='/' to='/login'/> */}
      <Main />
    </>
  )
}

export default App;
