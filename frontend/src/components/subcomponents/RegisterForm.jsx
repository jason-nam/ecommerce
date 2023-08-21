import React, { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { changeCart } from "../../utils/util"

export default function RegisterForm({registerState, registerDispatch, setUserId, setCart, authToast}) {
    const { userExists, error } = registerState;

    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        // mode: 'all',  //show warnings on input change
        defaultValues: {
            email: '', password: '', firstname: '', lastname: ''
        }
    });
    const [email, password, firstname, lastname] = watch(['email', 'password', 'firstname', 'lastname'])

    const navigate = useNavigate();
    const location = useLocation();

    const createAccount = (e) => {

        axios.post("/api/register", {
            email, firstname, lastname, password, isactive:true
        })
        .then(res => 
            {
                setUserId(res.data.id)
                registerDispatch({type: "REG_SUCCESS"})
                changeCart(setCart, navigate, location, authToast, `Welcome, ${firstname}`)
            }
        )
        .catch(err => {
            console.log(err)
            if (err.response.status === 409)
                registerDispatch({type: "REG_USEREXISTS"})
            registerDispatch({type: "REG_ERROR"})
        });
    }

    return (
            <div className="auth-form">
                {userExists ? <span role="alert" className="warning">User with this email already exists.</span> : null}
                <form onSubmit={handleSubmit(createAccount)}>
                    <div className="input-form">
                        <input 
                            { ...register("firstname", { required: "First name is required"})}                     
                            type="text" 
                            id = "reg-firstname" 
                            className = "auth-input"                                   
                        />
                        <label className={`auth-label ${firstname.length? " input" : ''}`} htmlFor="reg-firstname">First Name</label>
                        {errors.firstname && <span role="alert" className="warning">{errors.firstname.message}</span>}
                    </div>
                    <div className="input-form">
                        <input 
                            { ...register("lastname", { required: "Last name is required"})}                     
                            type="text" 
                            id = "reg-lastname"
                            className = "auth-input"                                    
                        />
                        <label className={`auth-label ${lastname.length? " input" : ''}`} htmlFor = "reg-lastname">Last Name</label>
                        {errors.lastname && <span role="alert" className="warning">{errors.lastname.message}</span>}
                    </div>   
                    <div className="input-form">
                        <input 
                            { ...register("email", { 
                                required: "Email is required", 
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address."
                                } 
                            }) }
                            id = "reg-email"  
                            className = "auth-input"                                    
                        ></input>
                        <label className={`auth-label ${email.length? " input" : ''}`} htmlFor = "reg-email">Email</label>
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
                            id = "reg-password" 
                            className = "auth-input"                                   
                        ></input>
                        <label className={`auth-label ${password.length? " input" : ''}`} htmlFor = "reg-password">Password</label>
                        {errors.password && <span role="alert" className="warning">{errors.password.message}</span>}
                    </div>  
                    <button className="auth-button" type="submit">Create Account</button>  
                    <div className="link-register">Already have an account? <Link to="/login">Sign in.</Link></div>
                </form>
            </div>
);

}