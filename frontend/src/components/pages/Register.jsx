import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../subcomponents/RegisterForm"
import "./AuthPage.css"
import { registerReducer, registerInitialState } from "../../utils/reducer";

export function Register({userId, setUserId, setCart, authToast}) {

    const navigate = useNavigate();
    const [ registerState, registerDispatch ] = useReducer(registerReducer, registerInitialState)
    const { registered } = registerState;

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
                <RegisterForm {...{registerState, registerDispatch, setUserId, setCart, authToast}}/>
            </>
        )
    else if (userId !== null)
        return <div>Logged in. Soon to be redirected</div>
    else if (userId === null) {
        return <div>loading...</div>
    }
  }

