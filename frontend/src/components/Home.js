import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Link } from "react-router-dom";



export function Home() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [id, setId] = useState(null);
    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get("/api/login")
        .then((res) => {
            if (res.data.loggedIn) {
                setId(res.data.user.id)
                setLoggedIn(res.data.loggedIn)
            } else 
                return;
        })
        .catch(err => console.log("Session Error"));        

      }, []);
    

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


    const linksShow = () => {
        if (!loggedIn){
            return (
                <div className="auth-container">
                <a href={`/login`}><div className="login-link">Sign In</div></a>
                <a href={`/register`}><div className="register-link">Sign Up</div></a>
                </div>
            )
        } else {
            return (
                <div>
                <a href={`/users/${id}`}><div className="profile-link">Profile</div></a>
                <Link to="/">
                <button className="logout-button" onClick={logout}>
                    Sign Out
                </button>
                </Link>
                </div>
            )
        }
    }

    return linksShow();

}

