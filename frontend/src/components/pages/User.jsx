import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios";
import './User.css'


export function User() {

    const { id } = useParams()
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personal');

    const [newFirstName, setNewFirstName] = useState("");

    // Fetch user data
    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        axios.get("/api/users/profile", { signal: controller.signal })
            .then((res) => {
                if (isMounted) {
                    setUser(res.data[0]);
                    setLoading(false);
                }
            })
            .catch(err => setError(true));

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        };

    }, [id]);

    // Update user's name data
    const updateUserName = async (e) => {
        e.preventDefault();
        try {
            const firstName = newFirstName; // New name value
            const updatedUser = { ...user, firstname: firstName };
            const response = await axios.put(`/api/users/name/${user.id}`, updatedUser);
            if (response.status === 200) {
                setUser(updatedUser); // Update local state with the updated user data
            }
        } catch (error) {
            // Handle error
        }
    };

    const updateBillingInfo = async () => {
        try {
            const newBillingInfo = {
                // New billing information object
            };

            // Use the appropriate route to update billing information
            const response = await axios.put(`/api/billing/${user.id}`, newBillingInfo);
            if (response.status === 200) {
                // Update billing information successfully
            }
        } catch (error) {
            // Handle error
        }
    };

    if (error) {
        return (
            <div className="user-page">
                Bad Request
            </div>
        )
    } else {
        return !loading ?(
            <div className="user-page">
                <div className="account-box">
                    <div id="greet">Hello,</div>
                    <div id="account-firstname">{user.firstname}</div>
                    <div id="email">{user.email}</div>
                    <div className="app-options">
                        <button
                            type="button"
                            onClick={() => setActiveTab('personal')}
                            className={activeTab === 'personal' ? 'active' : ''}
                            id="personal-information-button"
                        >
                            Personal Information
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('billing')}
                            className={activeTab === 'billing' ? 'active' : ''}
                            id="billing-payments-button"
                        >
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

                    <div
                        className={`personal-information-box ${
                            activeTab === 'personal' ? 'active' : ''
                        }`}
                    >
                        <div id="title">Personal Information</div>
                        <div id="desc">
                            Manage your personal information, including phone numbers and email address where you can be contacted.
                        </div>

                        <div className="info-edit-container">
                            <div className="name-edit-box" id="edit-box">
                                <div id="variable">Name:</div>
                                <div id="name"> {user.firstname} {user.lastname}</div>
                                <input value={newFirstName} onChange={e => setNewFirstName(e.target.value)}>
                                    input
                                </input>
                            </div>
                            <div className="email-edit-box" id="edit-box">
                                <div id="variable">Email:</div>
                                <div id="name"> {user.email}</div>
                            </div>
                            <div className="country-region-box" id="edit-box">
                                <div id="variable">Country Region:</div>
                                <div id="name"> {}</div>
                            </div>
                        </div>

                    </div>

                    <div
                        className={`billing-payments-box ${
                            activeTab === 'billing' ? 'active' : ''
                        }`}
                    >
                        <div id="title">Billing & Payments</div>
                        <div id="desc">
                            Manage your billings and payments information.
                        </div>

                        <div className="payments-edit-container">
                            
                        </div>

                    </div>

                </div>
            </div>
        ) : (<p>loading</p>);
    }
}

