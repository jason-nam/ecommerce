import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../subcomponents/RegisterForm"
import "./AuthPage.css"

export function Register({userId, setUserId, setCart}) {

    const [registered, setRegistered] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        if (userId > 0 && userId !== null && !registered) {
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }
    }, [userId] )


    if (userId === -1) 
        return (
            <>
                <h1 className = "auth-title">Register</h1>
                <RegisterForm {...{setRegistered, setUserId, setCart}}/>
            </>
        )
    else if (userId != null)
        return <div>Already logged in. Soon to be redirected</div>

  }

