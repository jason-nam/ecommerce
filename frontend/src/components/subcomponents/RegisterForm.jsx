
import axios from 'axios'
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm({setRegistered, setUserExists}) {

    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        // mode: 'all',  //show warnings on input change
        defaultValues: {
            email: '', password: '', firstname: '', lastname: ''
        }
    });
    const email = watch('email')
    const password = watch('password')
    const firstname = watch('firstname')
    const lastname = watch('lastname')

    const createAccount = (e) => {
        e.preventDefault();
        axios.post("/api/register", {
                email, firstname, lastname, password, isactive:true
        })
        .then(res => 
            {setRegistered(true);}
        )
        .catch(err => {
            if (err.response.status === 409)
                setUserExists(true)
        });
    }

    return (
            <div className="auth-form">
                <form onSubmit={handleSubmit(createAccount)}>
                    <div className="input-form">
                        <label className={`auth-label ${firstname.length? " input" : ''}`} htmlFor="reg-firstname">First Name</label>
                        <input 
                            { ...register("firstname", { required: "First name is required"})}                     
                            type="text" 
                            id = "reg-firstname" 
                            className = "auth-input"                                   
                        />
                        {errors.firstname && <span role="alert" className="warning">{errors.firstname.message}</span>}
                    </div>
                    <div className="input-form">
                        <label className={`auth-label ${lastname.length? " input" : ''}`} htmlFor = "reg-lastname">Last Name</label>
                        <input 
                            { ...register("lastname", { required: "Last name is required"})}                     
                            type="text" 
                            id = "reg-lastname"
                            className = "auth-input"                                    
                        />
                        {errors.lastname && <span role="alert" className="warning">{errors.lastname.message}</span>}
                    </div>   
                    <div className="input-form">
                        <label className={`auth-label ${email.length? " input" : ''}`} htmlFor = "reg-email">Email</label>
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
                        <span role="alert" className="warning">{errors.email && errors.email.message}</span>
                    </div>   
                    <div className="input-form">
                        <label className={`auth-label ${password.length? " input" : ''}`} htmlFor = "reg-password">Password</label>
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
                        {errors.password && <span role="alert" className="warning">{errors.password.message}</span>}
                    </div>  
                    <button className="auth-button" type="submit">Create Account</button>  
                </form>
            </div>
);

}