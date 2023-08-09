import Cookies from 'js-cookie';
import React, { useState, useRef, useEffect} from "react";
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

    let cartRight = document.querySelector('.cart-r'); 
    let menu = document.querySelector('.menu');
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

    // header block elements
    return (
        <>
        <header>
            {/* <div className='menu-button-box'>
                    <button id="menu-button" ref={addToRef} onClick={(event)=>{
                        event.stopPropagation();
                        if (menu) {
                            menu.classList.toggle('active')
                        } else
                            return null;
                    }}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                </div> */}

            <div className="nav-l-box" ref={addToRef}>
                <Link to="/" className="logo-link">
                    <img className='logo-img' src={logo} alt="Logo"></img>
                </Link>
            </div>

            <div className="nav-c-box">
                {/* <div className="products-list" ref={addToRef}>
                    <Link to="/products"><div>Products</div></Link>
                </div> */}
                <SearchForm searchRef={searchRef}/>
            </div>
            
            <div className="nav-r-box" ref={addToRef}>
                
                <div className="auth-box">
                    <a className = "auth-links" onClick={dropDownToggle}><FontAwesomeIcon icon={faUser} /></a>
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
                <div className='menu-button-box'>
                    <button id="menu-button" ref={addToRef} onClick={(event)=>{
                        event.stopPropagation();
                        if (menu) {
                            menu.classList.toggle('active')
                        } else
                            return null;
                    }}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                </div>
            </div>
        </header>
        

        <CartRight { ...{userId, cart, setCart} } />
        <div className="overlay-cart"></div>
        <Menu { ...{userId} } />
        <div className="overlay-menu"></div>
        </>

    )
}