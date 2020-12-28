import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Calendar from '../Pages/Calendar'
import LoginPage from '../Pages/LoginPage'
import RegistrationPage from '../Pages/RegistrationPage'
import paths from './paths'

const SwitchTo = () => {
    console.log(getToken())
    let token = getToken()
    if(!token){
        return (
            <Route path={registration} component={RegistrationPage} />
        )
    }else {
        return (
            <Route path={calendar} component={Calendar} />
        )
    }
}

export default SwitchTo