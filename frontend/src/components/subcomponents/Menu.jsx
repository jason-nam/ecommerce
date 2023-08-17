import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Menu.css'
import {urlChange} from "../../utils/util"

export default function Menu({userId, menuRef, logout, mainRef, headerRef}) {

    const [ categories, setCategories ] = useState([])
    //categories
    useEffect(() => {
        axios.get("/api/category/categories")
        .then( res =>
            setCategories(res.data.data)
        ).catch(err => console.log(err))
    }, [setCategories])
 
    // close menu
    const hideMenuRef = useRef([])
    const addToRef = (x) => {
        x && !hideMenuRef.current.includes(x)? hideMenuRef.current.push(x) : null
    }

    const menuEscape = useCallback((e) => {
        if (e.key === "Escape") {
            menuRef.current.classList.remove('active');
            document.body.classList.remove('modal');
            menuRef.current.setAttribute('aria-hidden', 'true')
            mainRef.current.setAttribute('aria-hidden', 'false')
            headerRef.current.setAttribute('aria-hidden', 'false')
            let itemAll = document.querySelectorAll(".item")
            itemAll.forEach(x => x.classList.remove('active'))
        }
    }, [menuRef, mainRef, headerRef])

    const menuClick = useCallback ((e) => {
        if ((menuRef.current && !menuRef.current.contains(e.target)) ||
        hideMenuRef.current.some( x => x.contains(e.target))
        ) {
            menuRef.current.classList.remove('active');
            document.body.classList.remove('modal');
            menuRef.current.setAttribute('aria-hidden', 'true')
            mainRef.current.setAttribute('aria-hidden', 'false')
            headerRef.current.setAttribute('aria-hidden', 'false')
            let itemAll = document.querySelectorAll(".item")
            itemAll.forEach(x => x.classList.remove('active'))
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

    //show subcategories 
    const showSubcategories = (e) => {
        let itemAll = document.querySelectorAll(".item")
        if (itemAll) {
            let itemsFiltered = Array.from(itemAll).filter(x => x != e.target.parentElement && x != e.target )
            itemsFiltered.forEach(x => x.classList.remove('active'))
            e.target.parentElement.classList.toggle('active')
        }
    }

    //close subcategories
        
    return (
        <div className='menu' ref={menuRef} role="dialog" aria-hidden="true">

            <div className="head">
                <button type="button" id="close-menu" ref={addToRef}>&times;</button>
            </div>

            <div className="main">
                <div className="item" id="products-item" >
                    <Link to="/products" ref={addToRef}>Products</Link>
                </div>
                {categories.map(c => {
                    return <div key={c.name} className="item-group">
                        <div className="item">
                            <span className="main-category" onClick={showSubcategories}>{c.name}</span>
                        </div>
                        <div className="subcategories">
                            <div><Link to={`/products/${urlChange(c.name)}`} className="subcategory" ref={addToRef}>All</Link></div>
                        {c.sub.map( sc => {
                            return  <div key={`${c.name}-${sc}`} className="subcategory">
                                <Link to={`/products/${urlChange(c.name)}/${urlChange(sc)}`} ref={addToRef}>{sc}</Link>
                            </div>;
                        })}
                        </div>
                    </div>                   
                })}

                <div className="separator"></div>

                {userId === -1 ?  
                <>
                    <div className="item"><Link to="/login" ref={addToRef}>Sign In</Link></div>
                    <div className="item"><Link to="/register" ref={addToRef}>Register</Link></div> 
                </>
                : userId !== null ? 
                <>
                    <div className="item"><Link to="/users/profile" ref={addToRef}>Account</Link></div>
                    <div className="item"><Link to="/" ref={addToRef} className="logout-button" onClick={logout}>Sign Out</Link></div>
                </>
                : null
                }
                <div className="item" id="my-cart-item">
                    <Link to="/cart" ref={addToRef}>My Cart</Link>
                </div>

                <div className="item" id="my-orders-item">
                    <Link to="/orders" ref={addToRef}>My Orders</Link>
                </div>

                <div className="item" id="contact-item">
                    <Link to="/contacts" ref={addToRef}>Contact Us</Link>
                </div>
                
            </div>

        </div>
    )
}