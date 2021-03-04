import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import paths from './paths';

import Calendar from '../Pages/Calendar';
import LoginPage from '../Pages/LoginPage';
import RegistrationPage from '../Pages/RegistrationPage';
import ProtectedRoute from './ProtectedRoute';

function Main() {
    const { login, registration, calendar } = paths;
    return (

        <main>
            {/* <Route >
                <Redirect from="/" to="/login" />
            </Route> */}
            <Switch>
                <Route path={login} component={LoginPage} />
                <Route path={registration} component={RegistrationPage} />
                <ProtectedRoute path={calendar} component={Calendar} />
            </Switch>
        </main>
    )
}

export default Main;
