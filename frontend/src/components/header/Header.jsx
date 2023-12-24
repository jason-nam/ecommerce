import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "../subcomponents/SearchForm";
import './Header.css'
import logo from '../../assets/logo2.png'
import CartRight from "../subcomponents/CartRight";
import Menu from "../subcomponents/Menu";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBasketShopping, faBars } from '@fortawesome/free-solid-svg-icons'

export default function Header({userId, cart, setCart, mainRef, cartRef, cartToggle, headerRef, subtotal}) {

    const menuRef = useRef(null)
    const dropRef = useRef(null)
    // navigation
    // TODO
    
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

    const dropDownToggle = (e) => {
        e.preventDefault();
        dropRef.current.classList.toggle('show')
    }

    const dropDownClick = useCallback((e) => {
        if (dropRef.current && !dropRef.current.contains(e.target) 
        && !dropRef.current.previousSibling.contains(e.target) || 
        Array.from(dropRef.current.children).some( x => x.contains(e.target)) ) {
            dropRef.current.classList.remove('show');
        }
    }, [dropRef])

    // click to toggle dropdown
    useEffect( () => {
        document.addEventListener('click', dropDownClick, { capture: true })
        return () => document.removeEventListener('click', dropDownClick, { capture: true })
    },[dropDownClick])

    const menuToggle = (e) => {
        e.preventDefault();
        if (menuRef.current && mainRef.current && headerRef.current) {
            menuRef.current.classList.toggle('active')
            document.body.classList.toggle('modal')

            let ah = menuRef.current.classList.contains('active')
            menuRef.current.setAttribute('aria-hidden', !ah)
            mainRef.current.setAttribute('aria-hidden', ah)
            headerRef.current.setAttribute('aria-hidden', ah)
        }
        // let menu = document.querySelector('.menu');
        // (event)=>{
        //     event.stopPropagation();
        //     if (menu) {
        //         menu.classList.toggle('active')
        //     } 
        // }
    }

    // header block elements
    return (
        <>
        <header ref={headerRef}>
            <div className="nav-l-box">
                <Link to="/" className="logo-link">
                    <img className='logo-img' src={logo} alt="Logo"></img>
                </Link>
            </div>
            <div className="nav-c-box">
                <SearchForm headerRef={headerRef}/>
            </div>
            <div className="nav-r-box">
                
                <div className="auth-box">
                    <button type="button" className = "auth-links" onClick={dropDownToggle} aria-haspopup="true" >
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                    <div className="dropdown" ref={dropRef}>
                        {userId === -1 ?  
                        <>
                            <Link to="/login">Sign In</Link>
                            <Link to="/register">Join Us</Link>
                        </> 
                        : userId !==null ? 
                        <>
                            <Link to="/users/profile">Account</Link>
                            <Link to="/#">Setting</Link>
                            <Link to="/" className="logout-button" onClick={logout}>Sign Out</Link>
                        </>
                        : null
                    }
                    </div>
                </div>
                <div className="cart-button-box">
                    <button type="button" id='cart-button' onClick={cartToggle} aria-haspopup="dialog">
                        <FontAwesomeIcon icon={faBasketShopping}/>
                    </button>
                </div>
                <div className='menu-button-box'>
                    <button type="button" id="menu-button" onClick={menuToggle} aria-haspopup="dialog">
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                </div>
            </div>
        </header>
        

        <CartRight { ...{userId, cart, setCart, cartRef, mainRef, headerRef, subtotal} }/>
        <div className="overlay-cart" aria-hidden='true'></div>
        <Menu { ...{userId, menuRef, logout, mainRef, headerRef} } />
        <div className="overlay-menu" aria-hidden='true'></div>
        </>

    )
}