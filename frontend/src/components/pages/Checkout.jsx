import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios"
import './Checkout.css'

export function Checkout({userId, cart, setCart}) {
    const [ subtotal, setSubtotal ] = useState(0)
    const fnameRef = useRef(null)
    const lnameRef = useRef(null)
    const emailRef = useRef(null)

    //subtotal
    useEffect( () => {
        setSubtotal(cart.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0).toFixed(2))
    }, [cart])

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        if (userId > 0) {
            axios.get(`/api/users/profile`, {signal: controller.signal})
            .then(res => {
                if (isMounted) {
                    let user = res.data[0]
                    fnameRef.current.value = user.firstname;
                    lnameRef.current.value = user.lastname;
                    emailRef.current.value = user.email;
                }
            })
            .catch(err => console.log(err))
        }

        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }

    }, [userId])



    return (
        <div className="checkout">
            <div className="left-ch">
                <div className="shipping">
                    <div className="head">
                        <div className="title"> SHIPPING INFO </div>
                    </div>
                    {userId > 0 ? null: <Link to="/login" className="link">Sign in for a better experience</Link>}
                    <form className="shipping-form" >
                        <div className = "cinfo-double">
                            <div className="cinfo">
                                <input ref={fnameRef} id="cinfo-fname" className="cinfo-input"/>
                                <label htmlFor="cinfo-fname" className="cinfo-label">First Name</label>
                            </div>
                            <div className="cinfo">
                                <input ref={lnameRef} id="cinfo-lname" className="cinfo-input"/>
                                <label htmlFor="cinfo-lname" className="cinfo-label">Last Name</label>
                            </div>
                        </div>
                        <div className="cinfo">
                            <input id="cinfo-address" className="cinfo-input"/>
                            <label htmlFor="cinfo-address" className="cinfo-label">Address</label>
                        </div>
                        <div className="cinfo">
                            <input id="cinfo-address-2" className="cinfo-input"/>
                            <label htmlFor="cinfo-address-2" className="cinfo-label">Address 2</label>
                        </div>
                        <div className="cinfo-double">
                            <div className="cinfo">
                                <input id="cinfo-city" className="cinfo-input"/>
                                <label htmlFor="cinfo-city" className="cinfo-label">City</label>
                            </div>
                            <div className="cinfo">
                                <input id="cinfo-province" className="cinfo-input"/>
                                <label htmlFor="cinfo-province" className="cinfo-label">Province/State</label>
                            </div>
                        </div>
                        <div className="cinfo-double">
                            <div className="cinfo">
                                <input id="cinfo-code" className="cinfo-input"/>
                                <label htmlFor="cinfo-code" className="cinfo-label">Postal/Zip Code</label>
                            </div>
                            <div className="cinfo">
                                <input id="cinfo-country" className="cinfo-input"/>
                                <label htmlFor="cinfo-country" className="cinfo-label">Country</label>
                            </div>
                        </div>
                        <div className="cinfo">
                            <input id="cinfo-phone" className="cinfo-input"/>
                            <label htmlFor="cinfo-phone" className="cinfo-label">Phone</label>
                        </div>
                        <div className="cinfo">
                            <input id="cinfo-email" ref={emailRef} className="cinfo-input"/>
                            <label htmlFor="cinfo-email" className="cinfo-label">Email</label>
                        </div>
                    </form>
                </div>
                <div className="payment">
                    <div className="head">
                        <div className="title"> Payment </div>
                    </div>
                    <form>
                        <input type="radio" defaultChecked/>
                        <label>Debit/Credit</label>
                        <div className="debit-credit">
                            <div className="cinfo">
                                <input className="cinfo-input" id="cinfo-cardnum"/>
                                <label className="cinfo-label" htmlFor="cinfo-cardnum">Card Number</label>
                            </div>
                            <div className="cinfo">
                                <input className="cinfo-input" id="cinfo-cardname"/>
                                <label className="cinfo-label" htmlFor="cinfo-cardname">Name</label>
                            </div>
                            <div className="cinfo-double">
                                <div className="cinfo">
                                    <input className="cinfo-input" id="cinfo-expdate"/>
                                    <label className="cinfo-label" htmlFor="cinfo-expdate">MM/YY (Expiry Date)</label>
                                </div>
                                <div className="cinfo">
                                    <input className="cinfo-input" id="cinfo-cvv"/>
                                    <label className="cinfo-label" htmlFor="cinfo-cvv">CVV</label>
                                </div>
                            </div>
                        </div>
                        <input type="checkbox" defaultChecked className="billing-checkbox"/>
                        <label htmlFor="checkbox">Billing Address same as shipping</label>
                        <div className="billing-form">
                            <div className = "cinfo-double">
                                <div className="cinfo">
                                    <input id="binfo-fname" className="cinfo-input"/>
                                    <label htmlFor="binfo-fname" className="cinfo-label">First Name</label>
                                </div>
                                <div className="cinfo">
                                    <input id="binfo-lname" className="cinfo-input"/>
                                    <label htmlFor="binfo-lname" className="cinfo-label">Last Name</label>
                                </div>
                            </div>
                            <div className="cinfo">
                                <input id="binfo-address" className="cinfo-input"/>
                                <label htmlFor="binfo-address" className="cinfo-label">Address</label>
                            </div>
                            <div className="cinfo">
                                <input id="binfo-address-2" className="cinfo-input"/>
                                <label htmlFor="binfo-address-2" className="cinfo-label">Address 2</label>
                            </div>
                            <div className="cinfo-double">
                                <div className="cinfo">
                                    <input id="binfo-city" className="cinfo-input"/>
                                    <label htmlFor="binfo-city" className="cinfo-label">City</label>
                                </div>
                                <div className="cinfo">
                                    <input id="binfo-province" className="cinfo-input"/>
                                    <label htmlFor="binfo-province" className="cinfo-label">Province/State</label>
                                </div>
                            </div>
                            <div className="cinfo-double">
                                <div className="cinfo">
                                    <input id="binfo-code" className="cinfo-input"/>
                                    <label htmlFor="binfo-code" className="cinfo-label">Postal/Zip Code</label>
                                </div>
                                <div className="cinfo">
                                    <input id="binfo-country" className="cinfo-input"/>
                                    <label htmlFor="binfo-country" className="cinfo-label">Country</label>
                                </div>
                            </div>
                            <div className="cinfo">
                                <input id="binfo-phone" className="cinfo-input"/>
                                <label htmlFor="binfo-phone" className="cinfo-label">Phone</label>
                            </div>
                            <div className="cinfo">
                                <input id="binfo-email" className="cinfo-input"/>
                                <label htmlFor="binfo-email" className="cinfo-label">Email</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="order-box">
                    <button type="submit" id="order">Order</button>
                </div>
            </div>
            <div className="right-ch">
                <div className="order-summary">
                    <div className="head">
                        <div className="title"> ORDER SUMMARY </div>
                    </div>
                    <div className="subtotal-box">
                        <div id="subtotal">Subtotal</div>
                        <div id="value">{cart.length ? <>$ {subtotal}</> :<div>—</div>}</div>
                    </div>
                    <div className="tax-box">
                        <div id="tax">Tax</div>
                        <div id="value">—</div>
                    </div>
                    <div className="shipping-handling-box">
                        <div id="shipping-handling">Shipping</div>
                        <div id="value">—</div>
                    </div>
                    <div className="separator"></div>
                    <div className="total-box">
                        <div id="total">Total</div>
                        <div id="value">—</div>
                    </div>                    
                </div>
                <div className="cart-ch">
                    <div className="items-ch">
                        {cart.slice(0).reverse().map(item => {
                        return (
                            <div key={item.cartitemid}>
                            <div className="lines"></div>
                            <div className="item-ch" >
                                <div className="item-ch-img">
                                    <Link to={`/products/${item.id}`}>
                                        <img src={item.image}></img>
                                    </Link>
                                </div>
                                <div className="item-info-ch">
                                    <div className="info-left">
                                        <div className="name">{item.name}</div>
                                        <div className="category">{item.category}</div>
                                        <div className="qty">Qty: {item.qty}</div>
                                    </div>
                                    <div className="info-right">
                                        <div className="price">$ {(parseFloat(item.price) * item.qty).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )})}
                        <div className="lines"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}