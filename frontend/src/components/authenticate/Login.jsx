import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm"
import { loginReducer, loginInitialState } from "../../utils/reducer";
import "./AuthPage.css"

export function Login({userId, setUserId, setCart, authToast}) {

    const navigate = useNavigate();
    const [ loginState, loginDispatch ] = useReducer(loginReducer, loginInitialState)
    const { newLogin } = loginState;

    useEffect( () => {
        // let loginTimeout;
        if (userId > 0 && userId !== null && !newLogin) {
                // loginTimeout =setTimeout(() => {
                navigate(-1)
            // }, 2000)
        }
        // return () => clearTimeout(loginTimeout)
    }, [userId])

    return userId === -1 ?
        <>
            <h1 className = "auth-title">Sign In</h1>
            <LoginForm {...{setUserId, setCart, authToast, loginState, loginDispatch}}/>
        </>
    : userId !== null && !newLogin ?
        <div>You are logged in. Soon to be redirected</div>
    : userId === null ? 
        <div>loading...</div>
    : null
        

}

