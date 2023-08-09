import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Menu.css'

export default function Menu({userId, cart, setCart, overRef}) {

    // close menu
    const menuRef = useRef(null)
    const menuCloseRef = useRef(null)
    const searchRef = useRef([])
    const productPageRef = useRef(null)

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

                <div className="item" id="auth-item" ref={addToRef}>
                    
                </div>
                
            </div>

        </div>
    )
}