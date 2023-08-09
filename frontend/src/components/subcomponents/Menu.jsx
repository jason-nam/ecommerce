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
                (productPageRef.current && productPageRef.current.contains(e.target)))
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
                    <div class="item"><a href="/login">Sign In</a></div>
                    <div class="item"><a href="/register">Join Us</a></div> 
                </>
                : userId !== null ? 
                <>
                    <div class="item"><a href="/users/profile">Account</a></div>
                    <div class="item"><a href="/" className="logout-button" onClick={logout}>Sign Out</a></div>
                </>
                : null
                }

                <div className="item" id="my-orders-item">
                    <Link to="/">My Orders</Link>
                </div>

                <div className="item" id="contact-item">
                    <Link to="/">Contact Us</Link>
                </div>
                
            </div>

        </div>
    )
}