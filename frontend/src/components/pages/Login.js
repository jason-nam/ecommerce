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
                    navigate("/")
                }
                else
                    return
            }
        })
        .catch(err => console.log(err.response, "Session Error"));        
    
    }, [navigate]);

    //   if (!authSuccess) {
    //     navigate("");
    //   } else {
    //     navigate("/users/" + userId);
    //   }
    // }, [navigate, authSuccess, userId]);

      // if (auth) {
    //     const path = "/users/" + auth
    //     console.log(path)
    //     return <Navigate replace to={path} />;
    // };      

    return (<LoginForm setUserId = {setUserId}/>)


}

