import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Cart.css'
import { removeItem, updateItem } from '../../utils/util'

export function Cart({userId, cart, setCart, subtotal}) {

    return (
        <div className="cart">
            <div className="cart-box">
                <div className="head">
                    <div className="title"> CART </div>
                </div>
                <div className="items">
                    {cart.length ?
                        <></>
                        :<div className="cart-r-empty">Your cart is empty.&nbsp;
                        <Link to="/products" className="underline">Continue shopping.</Link></div>
                    }
                    {cart.slice(0).reverse().map(item => {
                    return (
                        <div key={item.cartitemid}>
                        <div className="lines"></div>
                        <div className="item" >
                            <div className="cart-prod-img">
                                <Link to={`/products/product/${item.id}`}>
                                    <img src={item.image.split(', ')[0]} alt={`${item.name}`}></img>
                                </Link>
                            </div>
                            <div className="cart-prod-info">
                                <div className="info">
                                    <div className="name-price">
                                        <Link to={`/products/product/${item.id}`}>
                                            <div className="name">{item.name}</div>
                                        </Link>
                                        <div className="price">$ {(parseFloat(item.price) * item.qty).toFixed(2)}</div>
                                    </div>
                                    {/* <div className="category">{item.category}</div> */}
                                </div>
                                <div className="info-qty">
                                    <div className="qty-edit">
                                        <div className="qty-var">Qty:&nbsp;&nbsp;</div>
                                        <div className="qty-val">
                                            <button className="qty-button" onClick={() => updateItem(false, item.cartitemid, item.qty, item.id, item.cartid, cart, userId, setCart)}>-</button>
                                            <div className="qty">{item.qty}</div>
                                            <button className="qty-button" onClick={() => updateItem(true, item.cartitemid, item.qty, item.id, item.cartid, cart, userId, setCart)}>+</button>
                                        </div>
                                    </div>
                                    <button className="remove-button" onClick={() => removeItem(item.cartitemid, cart, userId, setCart)}>Remove</button>
                                </div>
                            </div>
                        </div>
                        </div>
                        )})}
                    <div className="lines"></div>
                </div>
            </div>
            <div className="cart-summary">
                <div className="head">
                    <div className="title"> SUMMARY </div>
                </div>
                <div className="subtotal-box">
                    <div id="subtotal">Subtotal</div>
                    <div className="value">{cart.length ? <>$ {subtotal}</> :<div>—</div>}</div>
                </div>
                <div className="tax-box">
                    <div id="tax">Estimated Tax</div>
                    <div className="value">—</div>
                </div>

                <div className="shipping-handling-box">
                    <div id="shipping-handling">Estimated Shipping & Handling</div>
                    <div className="value">—</div>
                </div>
                <div className="separator"></div>

                <div className="total-box">
                    <div id="total">Total</div>
                    <div className="value" id="total-value">—</div>
                </div>

                <div className="checkout-box">
                {cart.length ? 
                    <Link to="/checkout" id="checkout">Checkout</Link>
                    :<div id="checkout-empty-cart">Checkout</div>
                }
                </div>
                
            </div>
        </div>
    )
}