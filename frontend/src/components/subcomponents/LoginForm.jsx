import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm({setUserId, setAuth}) {
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        // mode: 'all',  //show warnings on input change
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
                setAuth(true)
                changeCart()
                navigate(-1)
            } else
                setAuthFail(true)
        })
        .catch(err => {
            if (err.response.status === 500)
                return;
            setAuthFail(true)
        });
    }

    const changeCart = () => {

        const ec = localStorage.getItem('ECOMMERCE_CART')
        let ls = JSON.parse(ec ? ec : "[]")

            // move localstorage items to db cart
            axios.post(
                "/api/carts/mycart/items/multi", 
                { items: ls })
                .then(res => {
                    localStorage.removeItem('ECOMMERCE_CART')
                    localStorage.removeItem('ECOMMERCE_ITEMID')
                })
                .catch(err => console.log(err))   
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