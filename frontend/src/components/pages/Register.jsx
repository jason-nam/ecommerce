import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../subcomponents/RegisterForm"
import "./AuthPage.css"

export function Register({userId}) {

    const navigate = useNavigate();
    const [registered, setRegistered] = useState(false);
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        
        if (registered) {
            navigate("/login");
        }

    }, [navigate, registered]);

    useEffect( () => {
        if (userId > 0 && userId !== null) {
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }
    }, [userId] )


    if (userId === -1) 
        return (
            <>
                <h1 className = "auth-title">Register</h1>
                <RegisterForm {...{setRegistered, setUserExists, userExists}}/>
            </>
        )
    else if (userId != null)
        return <div>Already logged in. Soon to be redirected</div>

  }

