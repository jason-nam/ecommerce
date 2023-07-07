import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const navigate = useNavigate();
    const [registered, setRegistered] = useState(false);
   
    useEffect(() => {
      if (!registered) {
        navigate("");
      } else {
        navigate("/login");
      }
    }, [navigate, registered]);
  

    const register = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
                email, firstname, lastname, password
            })
        })
        .then(res => {
            if (!res.ok)
                throw Error(res.status)
            return res.json()
        })
        .then(data => {setRegistered(true);})
        .catch(err => {console.log(err)});
    }

    return (
            <div className="App">
                <div className="reg-container">
                    <form onSubmit={register}>
                        <div>
                            <label>First Name</label>
                            <input 
                                type="text" 
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}                      
                                required
                            />
                            <label>Last Name</label>
                            <input 
                                type="text" 
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}                      
                                required
                            />
                        </div>   
                        <div>
                            <label>Email</label>
                            <input 
                                type="text" 
                                placeholder="your email..."
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
                                onChange={(e) => setPassword(e.target.value)}                      
                                required
                            ></input>
                        </div>  
                        <button type="submit">Create Account</button>  
                    </form>
                </div>
            </div>
    );
}

