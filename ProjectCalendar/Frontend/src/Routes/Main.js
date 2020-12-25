import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Calendar from '../Pages/Calendar'
import LoginPage from '../Pages/LoginPage'
import RegistrationPage from '../Pages/RegistrationPage'

function Main () {
  return (
      <main>
          <Switch>
              <Route exact path = '/' component = {LoginPage} />
              <Route path='/registration'component={RegistrationPage} />
              <Route path='/calendar' component={Calendar} />
          </Switch>
      </main>
  )
}

export default Main
