import React ,
{ useState} from 'react'
import './Registration.css'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addUser } from '../Actions';
import paths from '../Routes/paths'

const FormRegister = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        const { target: { children: {
            password: { value: password },
            confirmPassword: { value: confirmPassword },
            name : { value : name},
            email : { value : email },
        } } } = event

        if (password === confirmPassword) {
            dispatch(addUser(name , email , password))
            history.push(paths.calendar)
        }
    }

    const onChange = (event) => {
        const { target: { name, value } } = event

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
            <button type='submit'>Sign up </button>
        </form>
    </div>)
}

export default FormRegister
