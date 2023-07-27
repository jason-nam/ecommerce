import Cookies from 'js-cookie';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "../subcomponents/SearchForm";
import './Header.css'
import logo from '../../assets/logo-generic.png'
import CartRight from "../subcomponents/CartRight";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBasketShopping } from '@fortawesome/free-solid-svg-icons'



export default function Header({userId, cart, setCart}) {
    const [ error, setError ] = useState(false);

    // navigation
    // TODO

    // site logo
    // TODO

    // site name
    // TODO
    
    //log out
    const logout = () => {

        axios.get("/api/logout")
        .then((res) => {
            if (res.data.loggedOut) {
                window.location.reload();
            } else {
                console.log("log-out error");
            }
        })
        .catch(err => console.log(err));   

    }

    let cartRight = document.querySelector('.cart-r');

    // header block elements
    return (
        <>
        <header>
            <div className="left-nav">
                <Link to="/" className="logo">
                    <img className='logo-img' src={logo} alt="Logo"></img>
                </Link>
                <div className="products-list">
                    <Link to="/products"><div>Products</div></Link>
                </div>
                <div className="category">
                    <div></div>
                </div>
            </div>
            
            <div className="right-nav">
                <SearchForm />
                <div className="auth-container">
                    { ( userId === -1) ? (
                        <>
                            <a href="/login" className="login-link">
                                <FontAwesomeIcon icon={faUser} />
                            </a>
                            <a href="/register" className="register-link">Sign Up</a>
                        </>
                    )
                    : (userId != null) ? (
                        <>
                            <a href="/users/profile" className = "profile-link">Account</a>
                            <a href="/" className="logout-button" onClick={logout}>Sign Out</a>
                        </>
                    ) : null }
                </div>
                <div className="cart-button-container">
                    <button className='cart-button' onClick={()=>cartRight? cartRight.classList.add('active'): null}>
                    <FontAwesomeIcon icon={faBasketShopping} />
                    </button>
                </div>
            </div>
        </header>
        
        <CartRight { ...{userId, cart, setCart} } />
        <div className="overlay"></div>
        </>

    )

}