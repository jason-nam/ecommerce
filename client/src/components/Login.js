import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authFail, setAuthFail] = useState(false);
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();
    const [authSuccess, setAuthSuccess] = useState(false);
   
    useEffect(() => {
      if (!authSuccess) {
        navigate("");
      } else {
        navigate("/users/" + userId);
      }
    }, [navigate, authSuccess, userId]);
  

    const doLogin = (e) => {
        e.preventDefault();
        axios.post("/api/login", {      
            email: email,
            password: password
      })
        .then(res => {
            setUserId(res.data.id); setAuthSuccess(true);})
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
                                placeholder="your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}                      
                                required
                            ></input>
                        </div>   
                        <div>
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}                      
                                required
                            ></input>
                        </div>  
                        <button type="submit">Login</button>  
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

