import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Cart.css'

export function Checkout({userId, cart, setCart}) {


    return (
        <div className="checkout">
            <div className="cart-box">
]                <div className="items">
                    {cart.length ?
                        <></>
                        :<div className="cart-r-empty">Your cart is empty</div>
                    }
                    {cart.slice(0).reverse().map(item => {
                    return (
                        <div className="item" key={item.cartitemid}>
                            <div className="prod-img">
                                <Link to={`/products/${item.id}`}>
                                    <img src={item.image}></img>
                                </Link>
                            </div>
                            <div className="prod-info">
                                <div className="info">
                                    <div className="name-price">
                                        <Link to={`/products/${item.id}`}>
                                            <div id="name">{item.name}</div>
                                        </Link>
                                        <div id="price">$ {item.price}</div>
                                    </div>
                                    <div className="qty">
                                        <div id="qty">Qty {item.qty}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
                <div className="head">
                    <div id="title"> SUMMARY </div>
                </div>
                <div className="subtotal-box">
                    <div id="subtotal">Subtotal</div>
                    <div id="value">{cart.length ? <>$ {subtotal}</> :<div>—</div>}</div>
                </div>
                <div className="shipping-handling-box">
                    <div id="shipping-handling">Estimated Shipping & Handling</div>
                    <div id="value">—</div>
                </div>
                <div className="tax-box">
                    <div id="tax">Estimated Tax</div>
                    <div id="value">—</div>
                </div>

                <div className="separator"></div>

                <div className="total-box">
                    <div id="total">Total</div>
                    <div id="value">—</div>
                </div>

                <div className="checkout-box">
                {cart.length ? 
                    <Link id="checkout" to={`./`}>Checkout</Link>
                    :<div id="checkout-empty-cart">Checkout</div>
                }
                </div>
                
        </div>
    )
}