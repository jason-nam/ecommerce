import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Menu.css'

export default function Menu({userId}) {
 
    // close menu
    const menuRef = useRef(null)
    const menuCloseRef = useRef(null)
    const searchRef = useRef([])
    const productPageRef = useRef(null)
    const loginPageRef = useRef(null)
    const registerPageRef = useRef(null)
    const accountPageRef = useRef(null)
    const signOutPageRef = useRef(null)
    const ordersPageRef = useRef(null)
    const contactPageRef = useRef(null)

    //log out
    const logout = (e) => {
        e.preventDefault();

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

    const addToRef = (x) => {
        if (searchRef.current.length < 4) {
            searchRef.current.push(x)
        }
    }

    useEffect( () => {
        document.addEventListener('click', e => {
            if ((menuRef.current && !menuRef.current.contains(e.target)) ||
                (menuCloseRef.current && menuCloseRef.current.contains(e.target)) ||
                (productPageRef.current && productPageRef.current.contains(e.target)) ||
                (loginPageRef.current && loginPageRef.current.contains(e.target)) ||
                (registerPageRef.current && registerPageRef.current.contains(e.target)) ||
                (accountPageRef.current && accountPageRef.current.contains(e.target)) ||
                (signOutPageRef.current && signOutPageRef.current.contains(e.target)) ||
                (ordersPageRef.current && ordersPageRef.current.contains(e.target)) ||
                (contactPageRef.current && contactPageRef.current.contains(e.target)))
            {
                menuRef.current.classList.remove('active');
            }
        }, { capture: true })
    },[])
        
    return (
        <div className='menu' ref={menuRef}>

            <div className="head">
                <div id="close-menu" ref={menuCloseRef}>&times;</div>
            </div>

            <div className="main">
                <div className="item" id="products-item" ref={addToRef}>
                    <Link to="/products" ref={productPageRef}>Products</Link>
                </div>

                <div className="separator"></div>

                {userId === -1 ?  
                <>
                    <div className="item"><Link to="/login" ref={loginPageRef}>Sign In</Link></div>
                    <div className="item"><Link to="/register" ref={registerPageRef}>Register</Link></div> 
                </>
                : userId !== null ? 
                <>
                    <div className="item"><Link to="/users/profile" ref={accountPageRef}>Account</Link></div>
                    <div className="item"><Link to="/" ref={signOutPageRef} className="logout-button" onClick={logout}>Sign Out</Link></div>
                </>
                : null
                }

                <div className="item" id="my-orders-item">
                    <Link to="/orders/myorders" ref={ordersPageRef}>My Orders</Link>
                </div>

                <div className="item" id="contact-item">
                    <Link to="/contacts" ref={contactPageRef}>Contact Us</Link>
                </div>
                
            </div>

        </div>
    )
}