import React, { useState, useEffect, useRef, useReducer } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios"
import './Checkout.css'

const formReducer = (state, action) => {
    switch (action.type) {
        case "calculate":
            let subtotal = action.payload.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0).toFixed(2);
            let tax = (subtotal * 0.13).toFixed(2);
            return {
                ...state,
                subtotal,
                tax,
                shipping: 0,
                total: parseFloat(subtotal) + parseFloat(tax) ,
            };
    }
};  
const initialState = {
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
}


export function Checkout({userId, cart, setCart}) {
    const [ state, dispatch ] = useReducer(formReducer, initialState);
    const { subtotal, tax, shipping, total} = state;

    const billingCheck = useRef(null)
        
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstname: '', lastname: '', address: '',
            addressTwo: '', city: '', province: '', 
            code: '', country:'', phone:'', email: '',
            cardname: '', cardnum: '', expdate: '', cvv: ''
        }
    });
    const [firstname, lastname, address, addressTwo, 
        city, province, code, country, phone, email, 
        cardname, cardnum, expdate, cvv] = watch([
            'firstname', 'lastname', 'address', 'addressTwo', 
            'city', 'province', 'code', 'country', 'phone', 'email', 
            'cardname', 'cardnum', 'expdate', 'cvv'
        ])
    
    subtotal
    useEffect( () => {
        dispatch({ type: "calculate", payload: cart})
    }, [cart])

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        if (userId > 0) {
            axios.get(`/api/users/profile`, {signal: controller.signal})
            .then(res => {
                if (isMounted) {
                    let user = res.data[0]
                    dispatch({type:'field', field: 'firstname', input: user.firstname })
                    dispatch({type:'field', field: 'lastname', input: user.lastname })
                    dispatch({type:'field', field: 'email', input: user.email })
                }
            })
            .catch(err => console.log(err))
        }

        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }

    }, [userId])

    const submitOrder = () => {
        // if (billingCheck.current && billingCheck.current.checked)

    }

    return (
        <div className="checkout">
            <div className="left-ch">
            <form onSubmit={handleSubmit(submitOrder)}>
                <div className="shipping">
                    <div className="head">
                        <div className="title"> SHIPPING INFO </div>
                    </div>
                    {userId > 0 ? null: <Link to="/login" className="link">Sign in for a better experience</Link>}
                        <div className = "cinfo-double">
                            <div className="cinfo">
                                <input 
                                    id="cinfo-fname" 
                                    className="cinfo-input"
                                    { ...register("firstname", { required: "First name required" })}                     
                                    />
                                <label htmlFor="cinfo-fname" className={`cinfo-label ${firstname.length? 'active' : ''}`}>First Name</label>
                            </div>
                            <div className="cinfo">
                                <input id="cinfo-lname" className="cinfo-input" 
                                { ...register("lastname", { required: "Last name required" })}                     
                                />
                                <label htmlFor="cinfo-lname" className={`cinfo-label ${lastname.length? 'active' : ''}`}>Last Name</label>
                            </div>
                        </div>
                        <div className="cinfo">
                            <input id="cinfo-address" className="cinfo-input"
                            { ...register("address", { required: "Address required" })}                     
                            />
                            <label htmlFor="cinfo-address" className={`cinfo-label ${address.length? 'active' : ''}`}>Address</label>
                        </div>
                        <div className="cinfo">
                            <input id="cinfo-address-2" className="cinfo-input"
                            { ...register("addressTwo", { required: false })}                     
                            />
                            <label htmlFor="cinfo-address-2" className={`cinfo-label ${addressTwo.length? 'active' : ''}`}>Address 2</label>
                        </div>
                        <div className="cinfo-double">
                            <div className="cinfo">
                                <input id="cinfo-city" className="cinfo-input"
                                { ...register("city", { required: "City required"})}                     
                                />
                                <label htmlFor="cinfo-city" className={`cinfo-label ${city.length? 'active' : ''}`}>City</label>
                            </div>
                            <div className="cinfo">
                                <input id="cinfo-province" className="cinfo-input"
                                { ...register("province", { required: "Province required"})}                     
                                />
                                <label htmlFor="cinfo-province" className={`cinfo-label ${province.length? 'active' : ''}`}>Province/State</label>
                            </div>
                        </div>
                        <div className="cinfo-double">
                            <div className="cinfo">
                                <input id="cinfo-code" className="cinfo-input"
                                { ...register("code", { required: "Postal code required"})}                     
                                />
                                <label htmlFor="cinfo-code" className={`cinfo-label ${code.length? 'active' : ''}`}>Postal/Zip Code</label>
                            </div>
                            <div className="cinfo">
                                <input id="cinfo-country" className="cinfo-input"
                                { ...register("country", { required: "Country required"})}                     
                                />
                                <label htmlFor="cinfo-country" className={`cinfo-label ${country.length? 'active' : ''}`}>Country</label>
                            </div>
                        </div>
                        <div className="cinfo">
                            <input id="cinfo-phone" className="cinfo-input"
                            { ...register("phone", { required: "Phone number required"})}                     
                            />
                            <label htmlFor="cinfo-phone" className={`cinfo-label ${phone.length? 'active' : ''}`}>Phone</label>
                        </div>
                        <div className="cinfo">
                            <input id="cinfo-email" className="cinfo-input"
                            { ...register("email", { required: "Email required"})}                     
                            />
                            <label htmlFor="cinfo-email" className={`cinfo-label ${email.length? 'active' : ''}`}>Email</label>
                        </div>
                </div>
                <div className="payment">
                    <div className="head">
                        <div className="title"> Payment </div>
                    </div>
                    <input type="radio" defaultChecked/>
                    <label>Debit/Credit</label>
                    <div className="debit-credit">
                        <div className="cinfo">
                            <input className="cinfo-input" id="cinfo-cardnum" type="number"
                            { ...register("cardnum", { required: "Card Number is required", valueAsNumber: true})}                     
                            />
                            <label className={`cinfo-label ${cardnum.length ? 'active' : ''}`} 
                            htmlFor="cinfo-cardnum">Card Number</label>
                        </div>
                        <div className="cinfo">
                            <input className="cinfo-input" id="cinfo-cardname"
                            { ...register("cardname", { required: "Cardholder name is required"})}                     
                            />
                            <label className={`cinfo-label ${cardname.length ? 'active' : ''}`} 
                            htmlFor="cinfo-cardname">Name</label>
                        </div>
                        <div className="cinfo-double">
                            <div className="cinfo">
                                <input className="cinfo-input" id="cinfo-expdate"
                                { ...register("expdate", { required: "Card Expiry Date is required"})}                     
                                />
                                <label className={`cinfo-label ${expdate.length ? 'active' : ''}`} 
                                htmlFor="cinfo-expdate">MM/YY (Expiry Date)</label>
                            </div>
                            <div className="cinfo">
                                <input className="cinfo-input" id="cinfo-cvv"
                                { ...register("cvv", { required: "Card Verification Date required"})}                     
                                />
                                <label className={`cinfo-label ${cvv.length ? 'active' : ''}`} 
                                htmlFor="cinfo-cvv">CVV</label>
                            </div>
                        </div>
                    </div>
                    <input type="checkbox" defaultChecked className="billing-checkbox" ref={billingCheck} />
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
                </div>
                <div className="order-box">
                    <button type="submit" id="order">Order</button>
                </div>
            </form>
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
                        <div id="value">{tax > 0 ? <>$ {tax}</> :<div>—</div>}</div>
                    </div>
                    <div className="shipping-handling-box">
                        <div id="shipping-handling">Shipping</div>
                        <div id="value">{shipping > 0 ? <>$ {shipping}</> :<div>—</div>}</div>
                    </div>
                    <div className="separator"></div>
                    <div className="total-box">
                        <div id="total">Total</div>
                        <div id="value">{total? <>$ {total}</> :<div>—</div>}</div>
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