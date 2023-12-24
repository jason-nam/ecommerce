import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import './User.css'
import { states, provinces } from '../../utils/util'


export function User(id) {

    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personal');

    const [shipping, setShipping] = useState({});
    const [newAddrLine1, setNewAddrLine1] = useState("");
    const [newAddrLine2, setNewAddrLine2] = useState("");
    const [newAddrCity, setNewAddrCity] = useState("");
    const [newAddrProvince, setNewAddrProvince] = useState("");
    const [newAddrCountry, setNewAddrCountry] = useState("");
    const [newAddrPostal, setNewAddrPostal] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");

    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("********");

    // Fetch user and shipping data
    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        axios.get("/api/shipping/", { signal: controller.signal })
            .then((res) => {
                if (isMounted) {
                    if (res.data.rows[0].id === null) {
                        // Run the post request to create shipping entry
                        const newShippingData = {
                            first_name: user.firstname,
                            last_name: user.lastname
                        };
        
                        axios.post("/api/shipping/create", newShippingData)
                            .then((response) => {
                                setShipping(res.data.rows[0]);
                                setNewAddrLine1(res.data.rows[0].addr_line_1);
                                setNewAddrLine2(res.data.rows[0].addr_line_2);
                                setNewAddrCity(res.data.rows[0].addr_city);
                                setNewAddrProvince(res.data.rows[0].addr_province);
                                setNewAddrCountry(res.data.rows[0].addr_country);
                                setNewAddrPostal(res.data.rows[0].addr_postal);
                                setNewPhoneNumber(res.data.rows[0].phone_number);
                                setLoading(false);
                            })
                            .catch((error) => {
                                setError(true);
                            });
                    } else {
                        setNewFirstName(res.data.rows[0].firstname);
                        setNewLastName(res.data.rows[0].lastname);
                        setNewEmail(res.data.rows[0].email);
    
                        setShipping(res.data.rows[0]);
                        setNewAddrLine1(res.data.rows[0].addr_line_1);
                        setNewAddrLine2(res.data.rows[0].addr_line_2);
                        setNewAddrCity(res.data.rows[0].addr_city);
                        setNewAddrProvince(res.data.rows[0].addr_province);
                        setNewAddrCountry(res.data.rows[0].addr_country);
                        setNewAddrPostal(res.data.rows[0].addr_postal);
                        setNewPhoneNumber(res.data.rows[0].phone_number);
                        setLoading(false);
                    }
                }
            })
            .catch(err => setError(true));

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        };

    }, [user]);

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

    // Update user password
    const updateUserPassword = async(e) => {
        try {
            const password = newPassword;

            const updatedUser = { ...user, password: password };
            const response = await axios.put(`/api/users/password/${user.id}`, updatedUser);
            if (response.status === 204) {
                setUser(updatedUser);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Update shipping details data
    const updateShipping = async (e) => {
        try {
            const addrLine1 = newAddrLine1;
            const addrLine2 = newAddrLine2;
            const city = newAddrCity;
            const province = newAddrProvince;
            const country = newAddrCountry;
            const postalCode = newAddrPostal;
            const phoneNumber = newPhoneNumber;

            const updatedShipping = { ...shipping, 
                addr_line_1: addrLine1, 
                addr_line_2: addrLine2, 
                addr_city: city,
                addr_province: province,
                addr_country: country,
                addr_postal: postalCode,
                phone_number: phoneNumber 
            };
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
                            id="shipping-information-button"
                            type="button"
                            onClick={() => setActiveTab('shipping')}
                            className={activeTab === 'shipping' ? 'active' : ''}
                        >
                            Shipping Address
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
                            <div className="edit-box" id="email-edit-box">
                                <div className="variable">Email&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form-confidential"
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
                            <div className="edit-box" id="password-edit-box">
                                <div className="variable">Password&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form-confidential"
                                        id="password-edit-form"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)} //TODO
                                    />
                                    <button
                                        className="edit-submit-button"
                                        id="password-edit-submit-button"
                                        type="submit"
                                        onClick={() => updateUserPassword()}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>

                            <div className="edit-box" id="first-name-edit-box">
                                <div className="variable">First Name&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form"
                                        id="first-name-edit-form"
                                        value={newFirstName} 
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                    />
                                    {/* <button 
                                        className="edit-submit-button"
                                        id="first-name-edit-submit-button"
                                        type="submit" 
                                        onClick={() => updateUserName()}
                                    >
                                        Change
                                    </button> */}
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
                                    {/* <button 
                                        className="edit-submit-button"
                                        id="last-name-edit-submit-button"
                                        type="submit" 
                                        onClick={() => updateUserName()}
                                    >
                                        Change
                                    </button> */}
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
                                    {/* <button
                                        className="edit-submit-button"
                                        id="phone-edit-submit-button"
                                        type="submit"
                                        onClick={() => updateShipping()}
                                    >
                                        Change
                                    </button> */}
                                </div>
                            </div>

                            <button
                                className="update-submit-button"
                                id="phone-edit-submit-button"
                                type="submit"
                                onClick={() => updateShipping()}
                            >
                                Update
                            </button>

                        </div>

                    </div>

                    <div
                        className={`shipping-information-box ${
                            activeTab === 'shipping' ? 'active' : ''
                        }`}
                    >
                        <div className="title">Shipping Address</div>
                        <div className="desc">
                            Manage your personal address.
                        </div>
                        <div className="shipping-edit-container">

                            <div className="edit-box" id="region-edit-box">
                                <div className="variable">Address&nbsp;</div>
                                <div className="edit-form-box" id="address-edit-form-box">
                                    <div id="address-column">
                                        <input
                                            className="edit-form" 
                                            id="addr-line-1-edit-form"
                                            value={newAddrLine1} 
                                            onChange={(e) => setNewAddrLine1(e.target.value)}
                                        />
                                        <input
                                            className="edit-form" 
                                            id="addr-line-2-edit-form"
                                            value={newAddrLine2} 
                                            onChange={(e) => setNewAddrLine2(e.target.value)}
                                        />
                                    </div>
                                    {/* <button 
                                        className="edit-submit-button"
                                        id="address-edit-submit-button"
                                        type="submit" 
                                        onClick={() => updateShipping()}
                                    >
                                        Change
                                    </button> */}
                                </div>
                            </div>
                            <div className="edit-box" id="city-edit-box">
                                <div className="variable">City&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form"
                                        id="city-edit-form"
                                        value={newAddrCity}
                                        onChange={(e) => setNewAddrCity(e.target.value)}
                                    />
                                    {/* <button
                                        className="edit-submit-button"
                                        id="city-edit-submit-button"
                                        type="submit"
                                        onClick={() => updateShipping()}
                                    >
                                        Change
                                    </button> */}
                                </div>
                            </div>
                            <div className="edit-box" id="province-edit-box">
                                <div className="variable">Province/State&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form"
                                        id="province-edit-form"
                                        value={newAddrProvince}
                                        onChange={(e) => setNewAddrProvince(e.target.value)}
                                    />
                                    {/* <button
                                        className="edit-submit-button"
                                        id="province-edit-submit-button"
                                        type="submit"
                                        onClick={() => updateShipping()}
                                    >
                                        Change
                                    </button> */}
                                </div>
                            </div>
                            <div className="edit-box" id="country-edit-box">
                                <div className="variable">Country&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form"
                                        id="country-edit-form"
                                        value={newAddrCountry}
                                        onChange={(e) => setNewAddrCountry(e.target.value)}
                                    />
                                    {/* <button
                                        className="edit-submit-button"
                                        id="country-edit-submit-button"
                                        type="submit"
                                        onClick={() => updateShipping()}
                                    >
                                        Change
                                    </button> */}
                                </div>
                            </div>
                            <div className="edit-box" id="postal-edit-box">
                                <div className="variable">Postal Code&nbsp;</div>
                                <div className="edit-form-box">
                                    <input
                                        className="edit-form"
                                        id="postal-edit-form"
                                        value={newAddrPostal}
                                        onChange={(e) => setNewAddrPostal(e.target.value)}
                                    />
                                    {/* <button
                                        className="edit-submit-button"
                                        id="postal-edit-submit-button"
                                        type="submit"
                                        onClick={() => updateShipping()}
                                    >
                                        Change
                                    </button> */}
                                </div>
                            </div>
                            <button
                                className="update-submit-button"
                                id="shipping-edit-submit-button"
                                type="submit"
                                onClick={() => updateShipping()}
                            >
                                Update
                            </button>
                            
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

