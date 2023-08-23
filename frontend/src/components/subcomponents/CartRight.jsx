import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './CartRight.css'
import { removeItem, updateItem } from '../../utils/util'

export default function CartRight({userId, cart, setCart, cartRef, mainRef, headerRef, subtotal}) {

    const closeRef = useRef(null)
    const cartPageRef = useRef(null)
    
    useEffect(() => {
        const ec = localStorage.getItem('ECOMMERCE_CART')
        let ls = JSON.parse(ec ? ec : "[]")

        if (userId > 0) {
            let isMounted = true;
            const controller = new AbortController();
            const signal = controller.signal;

            // get cart from db
            axios.get("/api/carts", {signal: signal})
            .then(res => {
                if (isMounted) {
                    setCart(res.data.items)
                }
            })
            .catch(err => console.log(err))
                
            return () => {
                isMounted = false;
                isMounted && controller.abort()
            }
        } else {
            setCart(ls)
        } 
    
    }, [setCart, userId])

    // close cart by Escape key
    const cartEscape = useCallback((e) => {
        if (e.key === "Escape") {
            cartRef.current.classList.remove('active');
            document.body.classList.remove('modal');
            cartRef.current.setAttribute('aria-hidden', 'true')
            mainRef.current.setAttribute('aria-hidden', 'false')
            headerRef.current.setAttribute('aria-hidden', 'false')
        }
    }, [cartRef, mainRef, headerRef])

    // close cart by click
    const cartClick = useCallback ((e) => {
        if (cartRef.current && !cartRef.current.contains(e.target) ||
        closeRef.current && closeRef.current.contains(e.target) ||
        cartPageRef.current && cartPageRef.current.contains(e.target)) {
            cartRef.current.classList.remove('active');
            document.body.classList.remove('modal');
            cartRef.current.setAttribute('aria-hidden', 'true')
            mainRef.current.setAttribute('aria-hidden', 'false')
            headerRef.current.setAttribute('aria-hidden', 'false')
        }
    }, [cartRef, mainRef, headerRef])

    useEffect(() => {
        document.addEventListener('keydown', cartEscape)
        return () => document.removeEventListener('keydown', cartEscape)
    },[cartEscape])

    
    useEffect( () => {
        document.addEventListener('click', cartClick, { capture: true })
        return () => document.removeEventListener('click', cartClick)
    }, [cartClick])

        
    return (
        <div className='cart-r' ref={cartRef} role="dialog" aria-hidden="true" >
            
            <div className="head">
                <div className="title"> Shopping Bag </div>
                <button type="button" id="close-cart" ref={closeRef}>&times;</button>
            </div>

            <div className="items">
                {cart.length ?
                    <></>
                    :<div className="cart-r-empty">Your bag is empty</div>
                }
                {cart.slice(0).reverse().map(item => {
                    return (
                        <div className="item" key={item.cartitemid}>
                            <div className="item-container">
                                <div className="image">
                                    <a href={`/products/product/${item.id}`}>
                                        <img className='cartitem-img' src={item.image.split(', ')[0]} alt={`${item.name}`}></img>
                                    </a>
                                </div>
                                <div className="info-text-container">
                                    <div className="item-top">
                                        <a href={`/products/product/${item.id}`} className="bag-name">
                                            {item.name}
                                        </a>
                                        {/* <a href={`/#`} className="bag-category">
                                            {item.subcategory}
                                        </a> */}
                                        <div className="bag-price">${(parseFloat(item.price) * item.qty).toFixed(2)}</div>
                                    </div>
                                    <div className="item-bottom">
                                        <div className="bag-qty">
                                            <div>Qty:&nbsp;&nbsp;</div>
                                            <button 
                                                className="bag-qty-edit" 
                                                onClick={() => updateItem(false, item.cartitemid, item.qty, item.id, item.cartid, cart, userId, setCart)}>
                                                -
                                            </button>
                                            <div className="bag-qty-amt">{item.qty}</div>
                                            <button 
                                                className="bag-qty-edit" 
                                                onClick={() => updateItem(true, item.cartitemid, item.qty, item.id, item.cartid, cart, userId, setCart)}>
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            className="remove-cart" 
                                            onClick={() => removeItem(item.cartitemid, cart, userId, setCart)}>
                                                Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="foot">
                <div className="total">
                    <div id="name">Subtotal</div>
                    <div id="value">{cart.length ? <>$ {subtotal}</> :<div>—</div>}</div>
                </div>
                <Link to="/cart" id="view-cart" ref={cartPageRef}>View Cart</Link>
            </div>
        </div>
    )
}