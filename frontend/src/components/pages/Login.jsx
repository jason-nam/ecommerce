import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../subcomponents/LoginForm"
import "./AuthPage.css"

export function Login({userId, setUserId, setCart}) {

    const navigate = useNavigate();
    const [ newLogIn, setNewLogin ] = useState(false)

    useEffect( () => {
        let loginTimeout;
        if (userId > 0 && userId !== null && !newLogIn) {
                loginTimeout =setTimeout(() => {
                navigate("/")
            }, 2000)
        }

        return () => clearTimeout(loginTimeout)
    }, [userId])

    return userId === -1 ?
        <>
            <h1 className = "auth-title">Sign In</h1>
            <LoginForm {...{setUserId, setCart, setNewLogin}}/>
        </>
    : userId !== null && !newLogIn ?
        <div>You are logged in. Soon to be redirected</div>
    // : userId !== null && auth ?
    //     <div>...loading</div>
    : null
        

}

