import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


export function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authSuccess, setAuthSuccess] = useState(false);
    const [authFail, setAuthFail] = useState(false);
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();
   
    useEffect(() => {
        axios.get("/api/login")
        .then((res) => {
            if (res.data.loggedIn) 
                navigate("/users/"+userId);
            else
                console.log(res.data.loggedIn)
        })
        .catch(err => console.log("Session Error"));        

    }, [userId]);

    //   if (!authSuccess) {
    //     navigate("");
    //   } else {
    //     navigate("/users/" + userId);
    //   }
    // }, [navigate, authSuccess, userId]);
  

    const doLogin = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
                email, password
            }),
            credentials: "include"
        })
        .then(res => {
            if (!res.ok)
                throw Error(res.status)
            return res.json()
        })
        .then(data => {setUserId(data.id); })
        .catch(err => {console.log(err); setAuthFail(true)});
    }

    // if (auth) {
    //     const path = "/users/" + auth
    //     console.log(path)
    //     return <Navigate replace to={path} />;
    // };      

    return (
            <div className="App">
                <div className="pw-container">
                    <form onSubmit={doLogin}>  
                        <div>
                            <label>Email</label>
                            <input 
                                type="text" 
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                // type="email"   
                                // clearOnEscape                   
                                required
                            ></input>
                        </div>   
                        <div>
                            <label>Password</label>
                            <input 
                                type="password" 
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            ></input>
                        </div>  
                        <button type="submit">Login</button>  
                        <Link to="/register"><div>Create Account</div></Link>
                    </form>
                </div>
                {
                    authFail && (
                        <div className="authFail">
                            Wrong email or password!
                        </div>)
                }
            </div>
    );
}

