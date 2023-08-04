import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function LoginForm({setUserId}) {
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        // mode: 'all',
        defaultValues: {
            email: '', password: ''
        }
    });
    const email = watch('email')
    const password = watch('password')
    const [authFail, setAuthFail] = useState(false);
    const navigate = useNavigate();
    
    const doLogin = (data) => {
        axios.post("/api/login", data,
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
            {
                authFail ? (
                    <span role="alert" className="warning">
                        Your email or password is incorrect.
                    </span>)
                    : null
            }
                <form onSubmit={handleSubmit(doLogin)} >  
                    <div className="input-form">
                        <label className={`login-label ${email.length? " input" : ''}`} htmlFor="login-email">Email</label>
                        <input 
                            { ...register("email", { 
                                required: true, 
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address."
                                } 
                            }) }
                            id = "login-email" 
                            className = "login-input"                
                        ></input>
                         <span role="alert" className="warning">{errors.email && errors.email.message}</span>
                    </div>   
                    <div className="input-form">
                        <label className={`login-label ${password.length? " input" : ''}`} htmlFor="login-password">Password</label>
                        <input 
                            { ...register("password", { required: true,
                                minLength: { 
                                    value: 8,
                                    message: "Minimum password length is 8."
                                }
                            })} 
                            type="password" 
                            id = "login-password"  
                            className = "login-input"               
                        ></input>
                        {errors.password && <span role="alert" className="warning">{errors.password.message}</span>}
                    </div>  
                    <button className="login-button" type="submit">Sign In</button>  
                    <Link to="/register"><div className="link-register">Create Account</div></Link>
                </form>
        </div>
    );

}