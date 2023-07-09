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
            setId(res.data.user.id)
            setLoggedIn(res.data.loggedIn)
        })
        .catch(err => console.log("Session Error"));        

      }, []);
    

      const logout = () => {
        axios.get("/api/logout")
        .then((res) => {
            console.log(res.data.loggedOut)
            if (res.data.loggedOut)
                window.location.reload();
            else
                console.log("sth wrong")
        })
        .catch(err => console.log("error"));        
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

