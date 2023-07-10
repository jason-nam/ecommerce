import React, { useState, useEffect } from "react";
import { useNavigate, Link, Navigate} from "react-router-dom";
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
            if (res.data.loggedIn) {
                navigate("/")
            }
            else
                return
        })
        .catch(err => console.log(err.response, "Session Error"));        

    }, [userId]);

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


    const doLogin = (e) => {
        e.preventDefault();
        axios.post("/api/login", {
            email, password
        },
        {
            headers: { "Content-Type" : "application/json" },
            withCredentials: true,
        }).then(res => { 
            if (res.data.id) {
                setUserId(res.data.id)
                setAuthSuccess(true); 
             } else
                setAuthFail(true)}
             )
        .catch(err => {
            if (err.response.status === 500)
                return;
            setAuthFail(true)});
    }

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
                        <div className="warning">
                            Wrong email or password!
                        </div>)
                }
            </div>
    );
}

