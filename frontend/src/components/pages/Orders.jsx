import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Orders.css'

export function Orders({userId, cart, setCart}) {

          
    return (
        <div className="orders">
            Orders Page

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