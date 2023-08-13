import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../subcomponents/LoginForm"
import "./AuthPage.css"


export function Login({userId, setUserId, setCart, auth, setAuth}) {

    const navigate = useNavigate();

    useEffect( () => {
        if (userId > 0 && userId !== null && !auth) {
                setTimeout(() => {
                navigate("/")
            }, 2000)
        }
    }, [userId])

    return userId === -1 ?
        <>
            <h1 className = "auth-title">Sign In</h1>
            <LoginForm {...{setUserId, setCart, setAuth}}/>
        </>
    : userId !== null && !auth ?
        <div>You are logged in. Soon to be redirected</div>
    // : userId !== null && auth ?
    //     <div>...loading</div>
    : null
        

}

