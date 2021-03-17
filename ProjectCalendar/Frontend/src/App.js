import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';

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
  const [d, setD] = useState(event)

  const arr = [1, 2, [3, 4, [5, [6]]]];

  function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
      : arr.slice();
  };

  console.log(flatDeep(arr, Infinity))
  // commitChanges({ added, changed, deleted }) {
  //   this.setState((state) => {
  //     let { data } = state;
  //     if (added) {
  //       const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
  //       data = [...data, { id: startingAddedId, ...added }];
  //     }
  //     if (changed) {
  //       data = data.map(appointment => (
  //         changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
  //     }
  //     if (deleted !== undefined) {
  //       data = data.filter(appointment => appointment.id !== deleted);
  //     }
  //     return { data };
  //   });
  // }

  // console.log(event)
  return (
    <>
      {/* <Redirect from='/' to='/login'/> */}
      <Paper>
        <Scheduler data={Aevent}>
          <ViewState />
          <EditingState
          // onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>
      </Paper>
      <Main />
    </>
  )
}

export default App;
