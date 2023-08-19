import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios";
import './User.css'


export function User() {

    const { id } = useParams()
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        axios.get("/api/users/profile", 
        { signal: controller.signal })
        .then((res) => {
            if (isMounted) {
                setUser(res.data[0]);
                setLoading(false);
            }
        })
        .catch(err => setError(true));
        
        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }

    }, [id]);

    if (error) {
        return (
        <div className="user-page">
            Bad Request
        </div>
    )
    } else
        return !loading ?(
            <div className="user-page">
                <div className="account-box">
                    <div id="greet">Hello,</div>
                    <div id="account-firstname">{user.firstname}!</div>
                    <div id="email">{user.email}</div>
                    <div className="app-options">
                        <button type="button" id='personal-information-button'>
                            Personal Information
                        </button>
                        <button type="button" id="billing-payments-button">
                            Billing & Payments
                        </button>
                        <div id="cart-link">
                            <Link to="/cart">My Cart</Link>
                        </div>
                        <div id="orders-link">
                            <Link to="/orders">Order History</Link>
                        </div>
                    </div>
                </div>
                <div className="app-box">
                    <div className="personal-information-box">
                        Personal Information
                    </div>
                    <div className="billing-payments-box">
                        Billing & Payments
                    </div>
                </div>
            </div>
        ) :
        (<p>loading</p>)
        ;
}

