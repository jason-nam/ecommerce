import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Orders.css'

export function Orders({userId, cart, setCart}) {

          
    return (
        <div className="orders">
            
            <div className="head">
                <h1 id="title">My Orders</h1>
            </div>

            {userId === -1 ?  
                <>
                    Continue with:
                    <div className="item"><Link to="/login">Sign In</Link></div>
                    <div className="item"><Link to="/register">Register</Link></div> 
                </>
                : userId !== null ? 
                <>
                    Signed In
                </>
                : null
                }

        </div>
    )
}