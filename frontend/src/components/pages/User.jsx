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
    // const [editNameVisible, setEditNameVisible] = useState(false);

    const [shipping, setShipping] = useState({});
    const [newPhoneNumber, setNewPhoneNumber] = useState()

    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    // Fetch user data
    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        axios.get("/api/users/profile", { signal: controller.signal })
            .then((res) => {
                if (isMounted) {
                    setUser(res.data[0]);
                    setNewFirstName(res.data[0].firstname);
                    setNewLastName(res.data[0].lastname);
                    setNewEmail(res.data[0].email);
                    setLoading(false);
                }
            })
            .catch(err => setError(true));

        axios.get("/api/shipping/", { signal: controller.signal })
            .then((res) => {
                if (isMounted) {
                    setShipping(res.data.rows[0]);
                    // setNewPhoneNumber(res.data.row[0].phone_number);
                    setLoading(false);
                }
            })
            .catch(err => setError(true));

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        };

    }, [id]);

    // Update user's name information data
    const updateUserName = async (e) => {
        // e.preventDefault();
        try {
            const firstName = newFirstName; // new first name value
            const lastName = newLastName; // new last name value
            
            const updatedUser = { ...user, firstname: firstName, lastname: lastName };
            const response = await axios.put(`/api/users/name/${user.id}`, updatedUser);
            if (response.status === 204) {
                setUser(updatedUser); // Update local state with the updated user data
            }
        } catch (err) {
            // Handle error
            console.log(err);
        }
    };

    // Update user email data
    const updateUserEmail = async (e) => {
        // e.preventDefault();
        try {
            const email = newEmail; // new email value
            
            const updatedUser = { ...user, email: email };
            const response = await axios.put(`/api/users/email/${user.id}`, updatedUser);
            if (response.status === 204) {
                setUser(updatedUser); // Update local state with the updated user data
            }
        } catch (err) {
            // Handle error
            console.log(err);
        }
    };

    // Update shipping details data
    const updateShipping = async (e) => {
        try {
            const phoneNumber = newPhoneNumber;

            const updatedShipping = { ...shipping, phone_number: phoneNumber };
            const response = await axios.put(`/api/shipping/update/${shipping.id}`, updatedShipping);
            if (response.status === 200) {
                setShipping(updatedShipping);
            }
        } catch (err) {
            console.log(err);
        }
    }

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
                            id="personal-information-button"
                            type="button"
                            onClick={() => setActiveTab('personal')}
                            className={activeTab === 'personal' ? 'active' : ''}
                        >
                            Personal Information
                        </button>
                        <button
                            id="billing-payments-button"
                            type="button"
                            onClick={() => setActiveTab('billing')}
                            className={activeTab === 'billing' ? 'active' : ''}
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
                        <div className="title">Personal Information</div>
                        <div className="desc">
                            Manage your personal information, including phone numbers and email address where you can be contacted.
                        </div>

                        <div className="info-edit-container">
                            <div className="edit-box" id="first-name-edit-box">
                                <div className="variable">First Name&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form"
                                        id="first-name-edit-form"
                                        value={newFirstName} 
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                    />
                                    <button 
                                        className="edit-submit-button"
                                        id="first-name-edit-submit-button"
                                        type="submit" 
                                        onClick={() => updateUserName()}
                                    >
                                        Change
                                    </button>
                                </div>
                            
                            </div>
                            <div className="edit-box" id="last-name-edit-box">
                                <div className="variable">Last Name&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form" 
                                        id="last-name-edit-form"
                                        value={newLastName} 
                                        onChange={(e) => setNewLastName(e.target.value)}
                                    />
                                    <button 
                                        className="edit-submit-button"
                                        id="last-name-edit-submit-button"
                                        type="submit" 
                                        onClick={() => updateUserName()}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                            <div className="edit-box" id="email-edit-box">
                                <div className="variable">Email&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form"
                                        id="email-edit-form"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                    <button
                                        className="edit-submit-button"
                                        id="email-edit-submit-button"
                                        type="submit"
                                        onClick={() => updateUserEmail()}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                            <div className="edit-box" id="phone-edit-box">
                                <div className="variable">Mobile Phone Number&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form"
                                        id="phone-edit-form"
                                        value={newPhoneNumber}
                                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                                    />
                                    <button
                                        className="edit-submit-button"
                                        id="phone-edit-submit-button"
                                        type="submit"
                                        onClick={() => updateShipping()}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                            <div className="edit-box" id="region-edit-box">
                                <div className="variable">Country Region&nbsp;</div>
                                <div className="value"> {}</div>
                            </div>
                        </div>

                    </div>

                    <div
                        className={`billing-payments-box ${
                            activeTab === 'billing' ? 'active' : ''
                        }`}
                    >
                        <div className="title">Billing & Payments</div>
                        <div className="desc">
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

