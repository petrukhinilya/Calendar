import React from 'react'
import './Registration.css'
import { useState, useEffect } from "react";
const FormRegister = (props) => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    return (<div>
        <form >
            <input type="text" placeholder="Name" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="E-mail address" />
            <button type='submit'>Sign up</button>

        </form>
    </div>)
}

export default FormRegister
