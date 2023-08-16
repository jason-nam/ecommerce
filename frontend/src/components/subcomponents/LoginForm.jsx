import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { changeCart } from "../../utils/util"

export default function LoginForm({setUserId, setCart, setNewLogin}) {

    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        // mode: 'all',  //show warnings on input change
        defaultValues: {
            email: '', password: ''
        }
    });
    const email = watch('email')
    const password = watch('password')
    // const [authFail, setAuthFail] = useState(false);
    const [cartFail, setCartFail] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    
    const doLogin = (data, e) => {
        e.preventDefault();
        axios.post("/api/login", data,
        {
            headers: { "Content-Type" : "application/json" },
            withCredentials: true,
        })
        .then(res => {
            if (res.data.id) {
                setUserId(res.data.id)
                setNewLogin(true)
                changeCart(setCart, navigate, location)
                setAuthFail(false)
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
        <div className="auth-form">
            {
                authFail ? (
                    <span role="alert" className="warning">
                        Your email or password is incorrect.
                    </span>)
                    : null
            }
                <form onSubmit={handleSubmit(doLogin)} >  
                    <div className="input-form">
                        <input 
                            { ...register("email", { 
                                required: "Email is required", 
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address."
                                } 
                            }) }
                            id = "login-email" 
                            className = "auth-input"                
                        ></input>
                        <label className={`auth-label ${email.length? " input" : ''}`} htmlFor="login-email">Email</label>
                        <span role="alert" className="warning">{errors.email && errors.email.message}</span>
                    </div>   
                    <div className="input-form">
                        <input 
                            { ...register("password", { required: "Password is required",
                                minLength: { 
                                    value: 8,
                                    message: "Minimum password length is 8."
                                }
                            })} 
                            type="password" 
                            id = "login-password"  
                            className = "auth-input"               
                        ></input>
                        <label className={`auth-label ${password.length? " input" : ''}`} htmlFor="login-password">Password</label>
                        {errors.password && <span role="alert" className="warning">{errors.password.message}</span>}
                    </div>  
                    <button className="auth-button" type="submit">Sign In</button>  
                    <div className="link-register"><Link to="/register">Create Account</Link></div>
                </form>
        </div>
    );

}