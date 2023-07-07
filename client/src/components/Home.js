import React, { useState, useEffect } from "react";

export function Home() {

    const [loggedIn, setLoggedIn] = useState(false);

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
                <a href={`/users/${id}`}><div className="profile-link">Profile</div></a>
            )
        }
    }

    //session
    const id = 1;

        return (
                <div className="App">
                    <a href="/products"><div className="products-link">Products</div></a>
                    {linksShow()}
                    {/* <a href={`/login`}><div>Sign In</div></a>
                    <a href={`/register`}><div>Sign Up</div></a>
                    <a href={`/users/${id}`}><div>Profile</div></a> */}
                </div>);
        
}

