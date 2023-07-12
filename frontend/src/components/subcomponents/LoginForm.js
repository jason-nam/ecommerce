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
        }).then(res => { 
            if (res.data.id) {
                setUserId(res.data.id)
                navigate("/")
             } else
                setAuthFail(true)}
             )
        .catch(err => {
            if (err.response.status === 500)
                return;
            setAuthFail(true)});
    }

    return ( 
        <div className="login-form">
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
                authFail ? (
                    <div className="warning">
                        Wrong email or password!
                    </div>)
                    : null
            }
        </div>
    );

}