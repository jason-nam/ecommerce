import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import RegisterForm from "../subcomponents/RegisterForm"

export function Register() {

    const navigate = useNavigate();
    const [registered, setRegistered] = useState(false);
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        
    let isMounted = true;
    const controller = new AbortController();

    axios.get("/api/checkAuth", {signal: controller.signal})
    .then((res) => {
        if (isMounted) {
            if (res.data.loggedIn) {
                navigate("/")
            }
            else
                return
        }
    })
    .catch(err => console.log(err.response, "Session Error"));        

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
  
    return (
            <div>
                <RegisterForm setRegistered={setRegistered} setUserExists={setUserExists}/>
                {userExists ? <div className="warning">User Already Exists</div> : null}
            </div>
            )
}

