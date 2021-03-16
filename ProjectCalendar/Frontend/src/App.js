import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';

import Main from './Routes/Main';

import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const Aevent = [{
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2021, 2, 23, 12, 0),
    endDate: new Date(2021, 2, 23, 13, 0),
  }]
  const event = useSelector(state => state.events.events)
  const[d,setD] = useState(event)

  console.log(event)
  return (
    <>
      {/* <Redirect from='/' to='/login'/> */}
      <Paper>
        <Scheduler data={Aevent}>
          <ViewState />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
      <Main />
    </>
  )
}

export default App;
