
import axios from 'axios'
import React, { useState } from "react";


export default function RegisterForm({setRegistered, setUserExists}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const register = (e) => {
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
            <div className="reg-container">
                <form onSubmit={register}>
                    <div>
                        <label htmlFor="reg-firstname">First Name</label>
                        <input 
                            type="text" 
                            value={firstname}
                            placeholder = "First Name"
                            onChange={(e) => setFirstname(e.target.value)}  
                            id = "reg-firstname"                    
                            required
                        />
                        <label htmlFor = "reg-lastname">Last Name</label>
                        <input 
                            type="text" 
                            value={lastname}
                            placeholder = "Last Name"
                            onChange={(e) => setLastname(e.target.value)}  
                            id = "reg-lastname"                    
                            required
                        />
                    </div>   
                    <div>
                        <label htmlFor = "reg-email">Email</label>
                        <input 
                            type="text" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id = "reg-email"                      
                            required
                        ></input>
                    </div>   
                    <div>
                        <label htmlFor = "reg-password">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            placeholder = "Password"
                            onChange={(e) => setPassword(e.target.value)}  
                            id = "reg-password"                    
                            required
                        ></input>
                    </div>  
                    <button type="submit">Create Account</button>  
                </form>
            </div>
);

}