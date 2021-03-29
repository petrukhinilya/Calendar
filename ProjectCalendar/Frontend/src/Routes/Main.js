import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import paths from './paths';

import Calendar from '../Pages/Calendar';
import LoginPage from '../Pages/LoginPage';
import RegistrationPage from '../Pages/RegistrationPage';
import ProtectedRoute from './ProtectedRoute';

function Main() {
    const {login, registration, calendar} = paths
    return (
        <>
            <Switch>
                {/* <Route path='/*'>
                    <div>404 Page Not Found</div>
                </Route> */}
                <Route path={login} component={LoginPage} />
                <Route path={registration} component={RegistrationPage} />
                <ProtectedRoute path='/' component={Calendar} />
            </Switch>
        </>
    )
}

export default Main;
