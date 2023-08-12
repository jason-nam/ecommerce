import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Cart.css'
import { removeItem, updateItem } from '../../utils/util'

export function Cart({userId, cart, setCart}) {

    const [ subtotal, setSubtotal ] = useState(0)

    //subtotal
    useEffect( () => {
        setSubtotal(cart.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0).toFixed(2))
    }, [cart])


    return (
        <div className="cart">
            <div className="cart-box">
                <div className="head">
                    <div id="title"> CART </div>
                </div>
                <div className="items">
                    {cart.length ?
                        <></>
                        :<div className="cart-r-empty">Your cart is empty</div>
                    }
                    {cart.slice(0).reverse().map(item => {
                    return (
                        <>
                        <div className="lines"></div>
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
                                        <div id="price">$ {(parseFloat(item.price) * item.qty).toFixed(2)}</div>
                                    </div>
                                    {/* <div id="description">{item.description}</div> */}
                                    <div id="category">{item.category}</div>
                                </div>
                                <div className="info-qty">
                                    <div className="qty-edit">
                                        <div id="qty-var">Qty:&nbsp;&nbsp;</div>
                                        <div className="qty-val">
                                            <button id="qty-button" onClick={() => updateItem(false, item.cartitemid, item.qty, item.id, item.cartid, cart, userId, setCart)}>-</button>
                                            <div id="qty">{item.qty}</div>
                                            <button id="qty-button" onClick={() => updateItem(true, item.cartitemid, item.qty, item.id, item.cartid, cart, userId, setCart)}>+</button>
                                        </div>
                                    </div>
                                    <button id="remove-button" onClick={() => removeItem(item.cartitemid, cart, userId, setCart)}>Remove</button>
                                </div>
                            </div>
                        </div>
                        </>
                    )})}
                    <div className="lines"></div>
                </div>
            </div>
            <div className="summary-box">
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

                <div className="lines"></div>

                <div className="total-box">
                    <div id="total">Total</div>
                    <div id="value">—</div>
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