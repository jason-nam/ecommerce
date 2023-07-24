import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import LoginForm from "../subcomponents/LoginForm"


export function Login({userId, setUserId}) {

    const navigate = useNavigate();

    if (userId > 0 && userId != null) {
        setTimeout(() => {
            navigate("/")
        }, 2000)
    }

    if (userId === -1) 
        return <LoginForm setUserId = {setUserId}/>
    else if (userId != null)
        return <div>Already logged in. Soon to be redirected</div>

}

