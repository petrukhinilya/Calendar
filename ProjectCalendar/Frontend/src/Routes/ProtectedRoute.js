import React, { useEffect, useState, useMemo } from 'react';

import paths from './paths';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import Loading from '../Components/Loading';
// import { verifyTokenRoute } from '../Actions';

const verifyTokenRoute = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token })
        })
        const body = await response.json();

        return body.auth
    } catch (e) {
        console.log(e)

        return false
    }
}

const ProtectedRoute = (props) => {
    const token = localStorage.getItem('token');
    const history = useHistory();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     const checkVerify = async () => {
    //         dispatch(verifyTokenRoute(token))
    //         setIsAuthenticated(result);
    //     }
    //     checkVerify();
    // }, [])

    useEffect(() => {
        const checkVerify = async() => {
            const result = await verifyTokenRoute();
            setIsAuthenticated(result);
        }
        checkVerify();
    }, [])

    const { login, registration, calendar } = paths;

    const getRenderData = useMemo(() => {
        if (isAuthenticated === null) {
            return <div><Loading></Loading></div>
        }
        if (isAuthenticated) {
            const Component = props.component;

            return <Component />
        } else {
            history.push(paths.login);

            return null
        }
    }, [isAuthenticated])

    return getRenderData
}

export default ProtectedRoute;

