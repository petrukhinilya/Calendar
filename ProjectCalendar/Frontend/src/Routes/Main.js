import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Calendar from '../Pages/Calendar'
import LoginPage from '../Pages/LoginPage'
import RegistrationPage from '../Pages/RegistrationPage'
import paths from './paths'
import { getToken } from '../utils/utils';
import  SwitchTo  from './SwithTo';


function Main() {

    const { login, registration, calendar } = paths
    return (
        <main>
            <Switch>
                <Route exact path={login} component={LoginPage} />
                <Route path={registration} component={RegistrationPage} />
                <Route path={calendar} component={Calendar} />
                <SwitchTo></SwitchTo>
            </Switch>
        </main>
    )
}

export default Main
