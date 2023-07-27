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
            <div className="cart-r-header">
                <div className="title"> Shopping Cart </div>
                {/* <div className="delete-button">&times;</div> */}
                <Link to="/carts/mycart">
                    View Cart
                </Link>
            </div>
            {cart.length ?
                <></>
                :<div className="cart-r-empty">Your cart is empty</div>
            }
            {cart.slice(0).reverse().map(item => {
                return (
                    <div className="item" key={item.cartitemid}>

                        <div className="item-container">

                            <div className="item-image">
                                <Link to={`/products/${item.id}`}>
                                    <img className='cartitem-img' src={item.image}></img>
                                </Link>
                            </div>

                            <div className="item-info-container">

                                <div className="item-info-text-container">
                                    <Link to={`/products/${item.id}`}>
                                        <div>{item.name}</div>
                                    </Link>
                                    <Link to={`/products?category=${item.category}`}>
                                        <div>{item.category}</div>
                                    </Link>
                                    <div>${item.price}</div>
                                </div>

                                <div className="item-edit-container">
                                    <div className="qty">Qty: {item.qty}</div>
                                    <button id="qty-update" onClick={() => updateItem(false, item.cartitemid, item.qty, item.id, item.cartid)}>
                                        -
                                    </button>
                                    <button id="qty-update" onClick={() => updateItem(true, item.cartitemid, item.qty, item.id, item.cartid)}>
                                        +
                                    </button>
                                    <button className='cart-r-remove' onClick={() => removeItem(item.cartitemid)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            <div className="cart-r-footer">
                <div className="subtotal-name">Total</div>
                <div className="subtotal-value">
                    {cart.length ?
                        <>${}</>
                        :<div>—</div>
                    }
                </div>
            </div>

        </div>
    )
}