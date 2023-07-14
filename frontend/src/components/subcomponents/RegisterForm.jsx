
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
                email, firstname, lastname, password
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
                        <label>First Name</label>
                        <input 
                            type="text" 
                            value={firstname}
                            placeholder = "First Name"
                            onChange={(e) => setFirstname(e.target.value)}                      
                            required
                        />
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            value={lastname}
                            placeholder = "Last Name"
                            onChange={(e) => setLastname(e.target.value)}                      
                            required
                        />
                    </div>   
                    <div>
                        <label>Email</label>
                        <input 
                            type="text" 
                            placeholder="Email"
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
                            placeholder = "Password"
                            onChange={(e) => setPassword(e.target.value)}                      
                            required
                        ></input>
                    </div>  
                    <button type="submit">Create Account</button>  
                </form>
            </div>
);

}