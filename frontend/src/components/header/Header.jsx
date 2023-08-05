import Cookies from 'js-cookie';
import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "../subcomponents/SearchForm";
import './Header.css'
import logo from '../../assets/logo-generic.png'
import CartRight from "../subcomponents/CartRight";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBasketShopping } from '@fortawesome/free-solid-svg-icons'



export default function Header({userId, cart, setCart}) {

    let cartRight = document.querySelector('.cart-r'); 
    const searchRef = useRef([])
    const [ error, setError ] = useState(false);

    // navigation
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

    //mobile
    const addToRef = (x) => {
        if (searchRef.current.length < 4) {
            searchRef.current.push(x)
        }
    }

    // header block elements
    return (
        <>
        <header>
            <div className="nav-l-logo-box" ref={addToRef}>
                <Link to="/" className="logo">
                    <img className='logo-img' src={logo} alt="Logo"></img>
                </Link>
            </div>

            <div className="nav-c-product-category-search-box">
                <div className="products-list" ref={addToRef}>
                    <Link to="/products"><div>Products</div></Link>
                </div>
                <div className="category" ref={addToRef}>
                    <div></div>
                </div>
                <SearchForm searchRef={searchRef}/>
            </div>
            
            <div className="nav-r-auth-cart-box" ref={addToRef}>
                <div className="auth-container">
                    { ( userId === -1) ? (
                        <>
                            <a href="/login" className="login-link"><FontAwesomeIcon icon={faUser} /></a>
                            {/* <a href="/register" className="register-link">Sign Up</a> */}
                        </>
                    )
                    : (userId != null) ? (
                        <>
                            <a href="/users/profile" className = "profile-link"><FontAwesomeIcon icon={faUser} /></a>
                            <a href="/" className="logout-button" onClick={logout}>Sign Out</a>
                        </>
                    ) : null }
                </div>
                <div className="cart-button-container">
                    <button id='cart-button' onClick={(event)=>{
                        event.stopPropagation();
                        if (window.location.pathname === "/carts/mycart")
                            return null;      
                        else if (cartRight) {
                            cartRight.classList.toggle('active')
                        } else
                            return null;
                    }}>
                        <FontAwesomeIcon icon={faBasketShopping}/>
                    </button>
                </div>
            </div>
        </header>
        
        <CartRight { ...{userId, cart, setCart} } />
        <div className="overlay"></div>
        </>

    )
}