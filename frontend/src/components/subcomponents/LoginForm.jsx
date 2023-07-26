import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function LoginForm({setUserId}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authFail, setAuthFail] = useState(false);
    const navigate = useNavigate();
    
    const doLogin = (e) => {
        e.preventDefault();
        axios.post("/api/login", {
            email, password
        },
        {
            headers: { "Content-Type" : "application/json" },
            withCredentials: true,
        })
        .then(res => {
            if (res.data.id) {
                setUserId(res.data.id)
                navigate("/")
            } else
                setAuthFail(true)
        })
        .catch(err => {
            if (err.response.status === 500)
                return;
            setAuthFail(true)
        });
    }

    return ( 
        <div className="login-form">
            <div className="pw-container">
                <form onSubmit={doLogin}>  
                    <div>
                        <label htmlFor="login-email">Email</label>
                        <input 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"   
                            // clearOnEscape  
                            id = "login-email"                 
                            required
                        ></input>
                    </div>   
                    <div>
                        <label htmlFor="login-password">Password</label>
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            id = "login-password"                 
                            required
                        ></input>
                    </div>  
                    <button type="submit">Login</button>  
                    <Link to="/register"><div>Create Account</div></Link>
                </form>
            </div>
            {
                authFail ? (
                    <div className="warning">
                        Wrong email or password!
                    </div>)
                    : null
            }
        </div>
    );

}