import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import { LockOutlined } from '@ant-design/icons';
import AuthService from '../services/AuthService';
import logo from '../logo-dark.svg';

const ProtectedRoute = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const updateAuth = async () => {
        try {
            setIsLoading(true)
            const data = await AuthService.checkAuth()
            if (!data.errorCode) {
                setIsAuthenticated(true)
                setIsLoading(false)
            } else {
                setIsAuthenticated(false)
                setIsLoading(false)
            }
        } catch (e) {
            setIsAuthenticated(false)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        updateAuth();
    }, [])


    const Component = props.component;
    if (isLoading) {
        return (
            <React.Fragment>
                <div style={{ textAlign: "center", paddingTop: 100, height: "100vh" }} >
                    <img style={{ height: "50px" }} src={logo} alt="logo" />
                    <br />
                    <LockOutlined style={{ fontSize: '48px' }} />
                    <br />
                    <span style={{ fontSize: '18px' }}>Authenticating</span>
                </div>
            </React.Fragment>
        )
    }
    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }
    return <Component {...props} />
}

export default ProtectedRoute;