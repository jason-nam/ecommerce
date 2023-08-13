import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
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
                    <div>Shipping Info</div>
                    <Link to="/login" className="link">Sign in for a better experience</Link>
                    <form className="shipping-form" >
                        <div className="cinfo">
                            <input ref={fnameRef} />
                            <label>First Name</label>
                        </div>
                        <div className="cinfo">
                            <input ref={lnameRef}/>
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
                            <label>Postal/Zip Code</label>
                        </div>
                        <div className="cinfo">
                            <input />
                            <label>Phone</label>
                        </div>
                        <div className="cinfo">
                            <input ref={emailRef}/>
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
                        <input type="radio" defaultChecked/>
                        <label>Debit/Credit</label>
                    </form>
                </div>
                <div className="order-box">
                    <button type="submit" id="order">Order</button>
                </div>
            </div>
            <div className="right-ch">
                <div className="cart-ch">
                    <div className="head">
                        <div className="title"> SUMMARY </div>
                        <Link to="/cart">Edit</Link>
                    </div>
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
                                <div className="item-info">
                                    <div className="info">
                                        <div className="name-price">
                                            <div className="name">{item.name}</div>
                                            <div className="price">$ {(parseFloat(item.price) * item.qty).toFixed(2)}</div>
                                        </div>
                                        <div className="qty">Qty: {item.qty}</div>
                                        <div className="category">{item.category}</div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )})}
                        <div className="lines"></div>
                    </div>
                </div>
                <div className="order-summary">
                    <div className="subtotal-box">
                        <div id="subtotal">Subtotal</div>
                        <div id="value">{cart.length ? <>$ {subtotal}</> :<div>—</div>}</div>
                    </div>
                    <div className="shipping-handling-box">
                        <div id="shipping-handling">Shipping</div>
                        <div id="value">—</div>
                    </div>
                    <div className="tax-box">
                        <div id="tax">Tax</div>
                        <div id="value">—</div>
                    </div>

                    <div className="separator"></div>
                    <div className="total-box">
                        <div id="total">Total</div>
                        <div id="value">—</div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}