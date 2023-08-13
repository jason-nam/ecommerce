import React, { useRef, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Menu.css'

export default function Menu({userId, menuRef, logout, mainRef, headerRef}) {
 
    // close menu
    const menuCloseRef = useRef(null)
    const productPageRef = useRef(null)
    const loginPageRef = useRef(null)
    const registerPageRef = useRef(null)
    const accountPageRef = useRef(null)
    const signOutPageRef = useRef(null)
    const ordersPageRef = useRef(null)
    const contactPageRef = useRef(null)
    const cartPageRef = useRef(null)

    const menuEscape = useCallback((e) => {
        if (e.key === "Escape") {
            menuRef.current.classList.remove('active');
            document.body.classList.remove('modal');
            menuRef.current.setAttribute('aria-hidden', 'true')
            mainRef.current.setAttribute('aria-hidden', 'false')
            headerRef.current.setAttribute('aria-hidden', 'false')
            }
    }, [menuRef, mainRef, headerRef])

    const menuClick = useCallback ((e) => {
        if ((menuRef.current && !menuRef.current.contains(e.target)) ||
        (menuCloseRef.current && menuCloseRef.current.contains(e.target)) ||
        (productPageRef.current && productPageRef.current.contains(e.target)) ||
        (loginPageRef.current && loginPageRef.current.contains(e.target)) ||
        (registerPageRef.current && registerPageRef.current.contains(e.target)) ||
        (accountPageRef.current && accountPageRef.current.contains(e.target)) ||
        (signOutPageRef.current && signOutPageRef.current.contains(e.target)) ||
        (cartPageRef.current && cartPageRef.current.contains(e.target)) ||
        (ordersPageRef.current && ordersPageRef.current.contains(e.target)) ||
        (contactPageRef.current && contactPageRef.current.contains(e.target))) {
            menuRef.current.classList.remove('active');
            document.body.classList.remove('modal');
            menuRef.current.setAttribute('aria-hidden', 'true')
            mainRef.current.setAttribute('aria-hidden', 'false')
            headerRef.current.setAttribute('aria-hidden', 'false')
        }
    }, [menuRef, mainRef, headerRef])


    useEffect( () => {
        document.addEventListener('click', menuClick, { capture: true })
        return () => document.removeEventListener('click', menuClick)
    },[menuClick])

    useEffect( () => {
        document.addEventListener('keydown', menuEscape)
        return () => document.removeEventListener('keydown', menuEscape)
    },[menuEscape])

        
    return (
        <div className='menu' ref={menuRef} role="dialog" aria-hidden="true">

            <div className="head">
                <button type="button" id="close-menu" ref={menuCloseRef}>&times;</button>
            </div>

            <div className="main">
                <div className="item" id="products-item" >
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
                <div className="item" id="my-cart-item">
                    <Link to="/cart" ref={cartPageRef}>My Cart</Link>
                </div>

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