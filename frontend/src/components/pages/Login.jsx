import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../subcomponents/LoginForm"
import "./AuthPage.css"


export function Login({userId, setUserId}) {

    const navigate = useNavigate();

    if (userId > 0 && userId != null) {
        setTimeout(() => {
            navigate("/")
        }, 2000)
    }

        return  userId === -1 ?
                <>
                    <h1 className = "auth-title">Sign In</h1>
                    <LoginForm setUserId = {setUserId}/>
                </>
            : userId != null? 
            <div>Already logged in. Soon to be redirected</div>
            : null
        

}

