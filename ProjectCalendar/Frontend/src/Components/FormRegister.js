import React from 'react'
import './Registration.css'
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import { useDispatch } from 'react-redux'
import { addUser } from '../Actions';
import paths from '../Routes/paths'

const FormRegister = (props) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('event', e.target)
        const { target: { children: {
            password: { value: password },
            confirmPassword: { value: confirmPassword },
            name : {value : name},
            email : {value :email} 
        } } } = event
        console.log(password)
        console.log(confirmPassword)
        if (password === confirmPassword) {
            console.log('Equal')
            dispatch(addUser(name , email , password))
            history.push(paths.calendar)
        }

    }
    const onChange = (event) => {
        const { target: { name, value } } = event
        console.log('event', event)
        console.log('Name', name)
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            case 'confirmPassword':
                setConfirmPassword(value)
                break
            default:
                break
        }
    }
    return (<div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Name" name="name" value={name} />
            <input onChange={onChange} type="text" placeholder="E-mail address" name="email" value={email} />
            <input onChange={onChange} type="password" placeholder="Password" name="password" value={password} />
            <input onChange={onChange} type="password" placeholder="Confirm password" name="confirmPassword" value={confirmPassword} />
            <button type='submit' >Sign up </button>
            {/* onClick={()=>dispatch({type:'ADD_USER'})} */}
            {/* <NavLink to='/'> </NavLink> */}
        </form>
    </div>)
}

export default FormRegister