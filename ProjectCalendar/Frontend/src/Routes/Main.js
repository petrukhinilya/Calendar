import React , {useEffect} from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Calendar from '../Pages/Calendar'
import LoginPage from '../Pages/LoginPage'
import RegistrationPage from '../Pages/RegistrationPage'
import paths from './paths'
import ProtectedRoute from './ProtectedRoute';


function Main() {
 
    const { login, registration, calendar } = paths
    return (
        <main>     
            <Switch>
                <Route  path={login} component={LoginPage} />
                <Route path={registration} component={RegistrationPage} />
                <ProtectedRoute path={calendar} component={Calendar} />
            </Switch>
        </main>
    )
}

export default Main
