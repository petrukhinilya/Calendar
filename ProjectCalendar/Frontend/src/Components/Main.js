import React from 'react';
import SetCalendar from './Calendar'
import { Switch, Route } from 'react-router-dom'
function App() {
    return (
      <main>
          <Switch>
              <Route exact path = '/'></Route>
              <Route></Route>
              <Route></Route>
          <SetCalendar></SetCalendar>
          </Switch>
      </main>
    );
  }