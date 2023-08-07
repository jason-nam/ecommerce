import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Menu.css'

export default function Menu({userId, cart, setCart, overRef}) {

    // close menu
    const menuRef = useRef(null)
    const menuCloseRef = useRef(null)

    useEffect( () => {
        document.addEventListener('click', e => {
            if ((menuRef.current && !menuRef.current.contains(e.target)) ||
                (menuCloseRef.current && menuCloseRef.current.contains(e.target)))
            {
                menuRef.current.classList.remove('active');
            }
        }, { capture: true })
    },[])
        
    return (
        <div className='menu' ref={menuRef}>
            <div className="head">
                <div id="title"> Menu </div>
                <div id="close-cart" ref={menuCloseRef}>&times;</div>
            </div>
        </div>
    )
}