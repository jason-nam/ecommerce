import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import RegisterForm from "../subcomponents/RegisterForm"
import checkIfLoggedIn from "../checkAuth"

export function Register() {

    const navigate = useNavigate();
    const [registered, setRegistered] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        checkIfLoggedIn(setUserId, signal, isMounted);
        
        if (!registered) {
            navigate("");
        } else {
            navigate("/login");
        }

        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }

    }, [navigate, registered]);


    if (userId > 0 && userId != null) {
        setTimeout(() => {
            navigate("/")
        }, 2000)

    }


    if (userId === -1) 
        return (
            <div>
                <RegisterForm setRegistered={setRegistered} setUserExists={setUserExists}/>
                {userExists ? <div className="warning">User Already Exists</div> : null}
            </div>
        )
    else if (userId != null)
        return <div>Already logged in. Soon to be redirected</div>

  }

