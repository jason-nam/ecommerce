import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../subcomponents/RegisterForm"
import "./AuthPage.css"

export function Register({userId, setUserId, setCart, authToast}) {

    const [registered, setRegistered] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        let regTimeout;
        if (userId > 0 && userId !== null && !registered) {
            regTimeout = setTimeout(() => {
                navigate("/")
            }, 2000)
        }

        return () => clearTimeout(regTimeout)
    }, [userId] )


    if (userId === -1) 
        return (
            <>
                <h1 className = "auth-title">Register</h1>
                <RegisterForm {...{setRegistered, setUserId, setCart, authToast}}/>
            </>
        )
    else if (userId != null)
        return <div>Logged in. Soon to be redirected</div>

  }

