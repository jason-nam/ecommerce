
import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import checkIfLoggedIn from "../CheckAuth"

export default function Header() {
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(false)


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
    

      //log out
      const logout = () => {
        axios.get("/api/logout")
        .then((res) => {
            if (res.data.loggedOut)
                window.location.reload();
            else
                console.log("log-out error")
        })
        .catch(err => console.log(err));        
      }


    if (userId=== -1) 
        return  (
            <div className="auth-container">
            <a href={`/login`}><div className="login-link">Sign In</div></a>
            <a href={`/register`}><div className="register-link">Sign Up</div></a>
            </div>
        )
    else if (userId != null)
        return (
            <div>
            <a href={`/users/${userId}`}><div className="profile-link">Profile</div></a>
            <Link to="/">
            <button className="logout-button" onClick={logout}>
                Sign Out
            </button>
            </Link>
            </div>
        )

}