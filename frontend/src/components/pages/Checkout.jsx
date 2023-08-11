import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Cart.css'

export function Checkout({userId, cart, setCart}) {
    const [ subtotal, setSubtotal ] = useState(0)

    //subtotal
    useEffect( () => {
        setSubtotal(cart.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0).toFixed(2))
    }, [cart])


    return (
        <div className="checkout">
        <div className="shipping">
            <div>Shipping Info</div>
            <form>
                <div className="cinfo">
                    <input />
                    <label>First Name</label>
                </div>
                <div className="cinfo">
                    <input />
                    <label>Last Name</label>
                </div>
                <div className="cinfo">
                    <input />
                    <label>Address</label>
                </div>
                <div className="cinfo">
                    <input />
                    <label>City</label>
                </div>
                <div className="cinfo">
                    <input />
                    <label>Province/State</label>
                </div>
                <div className="cinfo">
                    <input />
                    <label>Phone</label>
                </div>
                <div className="cinfo">
                    <input />
                    <label htmlFor="email">Email</label>
                </div>
            </form>
        </div>
                <div className="payment">
                    <div className="payment-title">Payment</div>
                    <form>
                    <div className="checkout-input">
                        <input placeholder="Card Number"/>
                        <label>Card Number</label>
                    </div>
                    <div className="checkout-input">
                        <input placeholder="MM/YY"/>
                        <label>MM/YY</label>
                    </div>
                    <div className="checkout-input">
                        <input placeholder="CVV"/>
                        <label>CVV</label>
                    </div>
                    <input type="checkbox" defaultChecked/>
                    <label htmlFor="checkbox">Billing Address same as shipping</label>
                    </form>
                    <input type="radio" defaultChecked/>
                    <label>Debit/Credit</label>
                </div>
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
                                        <div id="name">{item.name}</div>
                                        <div id="price">$ {(parseFloat(item.price) * item.qty).toFixed(2)}</div>
                                    </div>
                                    <div id="category">{item.category}</div>
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

                <div className="separator"></div>

                <div className="total-box">
                    <div id="total">Total</div>
                    <div id="value">—</div>
                </div>

                <div className="checkout-box">
                    <Link to="/checkout" id="checkout">Order</Link>
                </div>
                
            </div>
        </div>
    )
}