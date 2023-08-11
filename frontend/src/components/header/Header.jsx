import Cookies from 'js-cookie';
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "../subcomponents/SearchForm";
import './Header.css'
import logo from '../../assets/logo2.png'
import CartRight from "../subcomponents/CartRight";
import Menu from "../subcomponents/Menu";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBasketShopping, faBars } from '@fortawesome/free-solid-svg-icons'

export default function Header({userId, cart, setCart}) {

    const menuRef = useRef(null)
    const cartRef = useRef(null)

    const headerRef = useRef(null);
    const [ error, setError ] = useState(false);

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

    // click to toggle dropdown
    const dropRef = useRef(null)
    const dropDownToggle = (e) => {
        e.preventDefault();
        dropRef.current.classList.toggle('show')
    }

    useEffect( () => {
        document.addEventListener('click', e => {
            if (dropRef.current && !dropRef.current.contains(e.target) 
            && !dropRef.current.previousSibling.contains(e.target))
            {
                dropRef.current.classList.remove('show');
            }
        }, { capture: true })
    },[])

    const menuToggle = (e) => {
        e.preventDefault();
        if (menuRef.current) {
            menuRef.current.classList.toggle('active')
            document.body.classList.toggle('modal')
        }
        // let menu = document.querySelector('.menu');
        // (event)=>{
        //     event.stopPropagation();
        //     if (menu) {
        //         menu.classList.toggle('active')
        //     } else
        //         return null;
        // }
    }

    const cartToggle = (e) => {
        e.preventDefault();
        if (cartRef.current) {
            cartRef.current.classList.toggle('active')
            document.body.classList.toggle('modal')
        }
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
                    <div className = "auth-links" onClick={dropDownToggle} ><FontAwesomeIcon icon={faUser} /></div>
                    <div className="dropdown" ref={dropRef}>
                        {userId === -1 ?  
                        <>
                            <a href="/login">Sign In</a>
                            <a href="/register">Join Us</a>
                        </> 
                        : userId !==null ? 
                        <>
                            <a href="/users/profile">Account</a>
                            <a href="/#">Setting</a>
                            <a href="/" className="logout-button" onClick={logout}>Sign Out</a>
                        </>
                        : null
                    }
                    </div>
                </div>
                <div className="cart-button-box">
                    <button id='cart-button' onClick={cartToggle}>
                        <FontAwesomeIcon icon={faBasketShopping}/>
                    </button>
                </div>
                <div className='menu-button-box'>
                    <button id="menu-button" onClick={menuToggle}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                </div>
            </div>
        </header>
        

        <CartRight { ...{userId, cart, setCart, cartRef} }/>
        <div className="overlay-cart" tabIndex="-1"></div>
        <Menu { ...{userId, menuRef} } />
        <div className="overlay-menu" tabIndex="-1"></div>
        </>

    )
}