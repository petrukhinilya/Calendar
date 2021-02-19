import React, {useEffect, useState, useMemo} from 'react'

import paths from './paths'
import { useHistory } from "react-router-dom";

import Loading from '../Components/Loading'



const verifyToken = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/user/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token })
        })
        const body = await response.json()
        console.log(body.auth)
        return body.auth
    } catch (e) {
        console.log(e)
        return false
    }

}

const ProtectedRoute = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const history = useHistory();
    useEffect(() => {
        const test1 = async() =>{
            const result = await verifyToken();
            setIsAuthenticated(result);
        }
        test1();
    }, [])
    const { login, registration, calendar } = paths
    const getRenderData = useMemo(() => {
        if(isAuthenticated === null){
            return <div><Loading></Loading></div>
        }
        if(isAuthenticated){
            const Component = props.component;
            return <Component/>
        } else {
            history.push(paths.login)
            return null
        }
    }, [isAuthenticated])
    console.log('isAuthenticated',isAuthenticated)
    return getRenderData;
}

export default ProtectedRoute

