import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import LoginForm from "../subcomponents/LoginForm"
import checkIfLoggedIn from "../CheckAuth"


export function Login() {

    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
   
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        checkIfLoggedIn(setUserId, signal, isMounted);
        
        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }

    }, []);


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

