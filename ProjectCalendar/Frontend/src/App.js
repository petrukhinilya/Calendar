import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
  Scheduler,
  WeekView,
  Appointments,
  MonthView
} from '@devexpress/dx-react-scheduler-material-ui';

import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';

import Main from './Routes/Main';

import './App.css';

function App() {
  return (
    <>
      {/* <Redirect from='/' to='/login'/> */}
      <Paper>
    <Scheduler>
      <ViewState/>
      <MonthView />
      <Appointments />
    </Scheduler>
  </Paper>
      <Main />
    </>
  )
}

export default App;
