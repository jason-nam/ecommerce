import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './CartRight.css'

export default function CartRight({userId, cart, setCart}) {

    useEffect(() => {

        const ec = localStorage.getItem('ECOMMERCE_CART')
        const ls = JSON.parse(ec ? ec : "[]")

        if (userId > 0) {
            let isMounted = true;
            const controller = new AbortController();
            const signal = controller.signal;

            // move localstorage items to db cart
            axios.post(
                "/api/carts/mycart/items/multi", 
                { items: ls })
                .then(res => {
                    if (isMounted) {
                        localStorage.removeItem('ECOMMERCE_CART')
                        localStorage.removeItem('ECOMMERCE_ITEMID')
                    }
                })
                .catch(err => console.log(err))    

            // get cart from db
            axios.get("/api/carts/mycart", {signal: signal})
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

    //remove item from cart
    const removeItem = (cartitemid) => {
        let updatedCart = cart.filter(x=> (x.cartitemid !== cartitemid));
        if (userId > 0) {
            axios.delete(`/api/carts/mycart/items/${cartitemid}`)
            .then(res => {
                setCart(updatedCart)
            })
            .catch(err => console.log(err))
        } else {
            localStorage.setItem('ECOMMERCE_CART', JSON.stringify(updatedCart))
            setCart(updatedCart)
        }
        setTimeout(() => document.querySelector('.cart-r')? 
        document.querySelector('.cart-r').classList.add('active'): null, 500)

    }

    const updateItem = (bool, cartitemid, qty, productid, cartid) => {
        if (bool)
            qty++;
        else {
            if (qty === 1)
                return;
            qty--
        }
        
        let updatedCart = cart.splice(0).map(x=> {
            if (x.cartitemid===cartitemid)
                x['qty']=qty;
            return x;
        })
        if (userId > 0) {
            axios.put(`/api/carts/mycart/items/${cartitemid}`, 
                {qty, productid, cartid})
            .then(res => setCart(updatedCart))
            .catch(err => console.log(err))
        } else {
            localStorage.setItem('ECOMMERCE_CART', JSON.stringify(updatedCart))
            setCart(updatedCart)
        }

    }
        
    return (
        <div className='cart-r'>
            <div className="head">
                <div id="title"> Shopping Cart </div>
                <div id="view-cart"><Link to="/carts/mycart" onClick={(event)=>{
                        event.stopPropagation();
                        cartRight? cartRight.classList.toggle('active'): null;
                    }}>View Cart</Link>
                </div>
            </div>

            <div className="items">
                {cart.length ?
                    <></>
                    :<div className="cart-r-empty">Your cart is empty</div>
                }
                {cart.slice(0).reverse().map(item => {
                    return (
                        <div className="item" key={item.cartitemid}>

                            <div className="item-container">

                                <div className="image">
                                    <Link to={`/products/${item.id}`}>
                                        <img className='cartitem-img' src={item.image}></img>
                                    </Link>
                                </div>

                                <div className="info-container">

                                    <div className="info-text-container">
                                        <div id="name"><Link to={`/products/${item.id}`}>{item.name}</Link></div>
                                        <div id="price">${item.price}</div>
                                        <div id="category">Category: <Link to={`/products?category=${item.category}`}>{item.category}</Link></div>
                                        <div id="qty">Qty: {item.qty}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="foot">
                <div className="total">
                    <div id="name">Total</div>
                    <div id="value">{cart.length ?<>${}</> :<div>—</div>}</div>
                </div>
            </div>

        </div>
    )
}