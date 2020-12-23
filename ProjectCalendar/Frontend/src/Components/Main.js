import React from 'react';
import { Switch, Route } from 'react-router-dom'
import SetCalendar from './Calendar'
import LoginPage from './LoginPage'
import RegistrationPage from './RegistrationPage'
function Main() {
    return (
      <main>
          <Switch>
              <Route exact path = '/' component = {LoginPage}></Route>
              <Route path='/registration'component={RegistrationPage}></Route>
              <Route path='/calendar' component={SetCalendar}></Route>
          {/* <SetCalendar></SetCalendar> */}
          </Switch>
      </main>
    );
  }


  export default Main