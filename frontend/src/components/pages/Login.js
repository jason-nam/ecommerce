import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import LoginForm from "../subcomponents/LoginForm"


export function Login() {

    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
   
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        axios.get("/api/checkAuth", {signal: controller.signal})
        .then((res) => {
            if (isMounted) {
                if (res.data.loggedIn) {
                    setUserId(res.data.user.id)
                }
                else
                    setUserId(-1)
            }
        })
        .catch(err => console.log(err.response, "Session Error")); 
        
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

