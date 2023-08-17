import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios"
import './Checkout.css'
import Cookies from 'js-cookie';

export function Checkout({userId, cart, setCart, subtotal, tax, shipping, total, orderToast}) {
    
    const navigate = useNavigate()
    //billing checkbox
    const [ checked, setChecked ] = useState(true)
    
    //form
    const { register, watch, handleSubmit, formState: { errors }, setValue, formState } = useForm({
        mode: "onChange",
        defaultValues: {
            firstname: '', lastname: '', address: '',
            addressTwo: '', city: '', province: '', 
            code: '', country:'', phone:'', email: '',
            cardname: '', cardnum: '', expdate: '', cvv: '',
            bfirstname: '', blastname: '', baddress: '', baddressTwo: '', 
            bcity: '', bprovince: '', bcode: '', bcountry: '', bphone: '', bemail: ''    
        }
    });
    const [firstname, lastname, address, addressTwo, 
        city, province, code, country, phone, email, 
        cardname, cardnum, expdate, cvv,
        bfirstname, blastname, baddress, baddressTwo, 
        bcity, bprovince, bcode, bcountry, bphone, bemail
    ] = watch([
            'firstname', 'lastname', 'address', 'addressTwo', 
            'city', 'province', 'code', 'country', 'phone', 'email', 
            'cardname', 'cardnum', 'expdate', 'cvv',
            'bfirstname', 'blastname', 'baddress', 'baddressTwo', 
            'bcity', 'bprovince', 'bcode', 'bcountry', 'bphone', 'bemail'
        ])
    
    //logged in => autofill
    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        if (userId > 0) {
            axios.get(`/api/users/profile`, {signal: controller.signal})
            .then(res => {
                if (isMounted) {
                    let user = res.data[0]
                    setValue("firstname", user.firstname)
                    setValue("lastname", user.lastname)
                    setValue("email", user.email)
                }
            })
            .catch(err => console.log(err))
        }

        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }

    }, [userId])

    //billing address same as shipping
    useEffect(() => {
        if (checked) {
            setValue("bfirstname", firstname)
            setValue("blastname", lastname)
            setValue("baddress", address)
            setValue("baddressTwo", addressTwo)
            setValue("bcity", city)
            setValue("bprovince", province)
            setValue("bcountry", country)
            setValue("bcode", code)
            setValue("bphone", phone)
            setValue("bemail", email)
        } else {
            setValue("bfirstname", '')
            setValue("blastname", '')
            setValue("baddress", '')
            setValue("baddressTwo", '')
            setValue("bcity", '')
            setValue("bprovince", '')
            setValue("bcountry", '')
            setValue("bcode", '')
            setValue("bphone", '')
            setValue("bemail", '')
        } 
    }, [checked, firstname, lastname, address, addressTwo, city, province, code, phone, email])

    //submit order
    const submitOrder = (data, e) => {
        e.preventDefault();
        let shipDetails = { 
            firstname: data.firstname,
            lastname: data.lastname,
            address: data.address,
            address2: data.addressTwo,
            city: data.city,
            province: data.province,
            country: data.country,
            code: data.code,
            email: data.email,
            phone: data.phone,
        }

        let cardDetails = {
            name: data.cardname,
            num: data.cardnum,
            cvv: data.cvv,
            exp: data.expdate, 
        }

        let billDetails = { 
            firstname: data.bfirstname,
            lastname: data.blastname,
            address: data.baddress,
            address2: data.baddressTwo,
            city: data.bcity,
            province: data.bprovince,
            country: data.bcountry,
            code: data.bcode,
            email: data.bemail,
            phone: data.bphone,
        }
        let paymentInfo = { shipDetails, cardDetails, billDetails }

        axios.post("/api/carts/checkout", 
            {
                paymentinfo: 'paymentInfo', 
                cart, 
                id: userId 
            }
        )
        .then(res => {
            setCart([])
            navigate("/guest-orders")
            orderToast("Order successful!")
        })
        .catch(err => console.log(err))
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
                            <div className={`cinfo ${errors.firstname? 'error' : '' }`}>
                                <input 
                                    id="cinfo-fname" 
                                    className="cinfo-input"
                                    { ...register("firstname", { required: "First name required" })}                     
                                    />
                                <label htmlFor="cinfo-fname" className={`cinfo-label ${firstname.length? 'active' : ''}`}>{errors.firstname? errors.firstname.message :'First Name'}</label>
                            </div>
                            <div className={`cinfo ${errors.lastname? 'error' : '' }`}>
                                <input id="cinfo-lname" className="cinfo-input" 
                                { ...register("lastname", { required: "Last name required" })}                     
                                />
                                <label htmlFor="cinfo-lname" className={`cinfo-label ${lastname.length? 'active' : ''}`}>{errors.lastname? errors.lastname.message :'Last Name'}</label>
                            </div>
                        </div>
                        <div className={`cinfo ${errors.address? 'error' : '' }`}>
                            <input id="cinfo-address" className="cinfo-input"
                            { ...register("address", { required: "Address required" })}                     
                            />
                            <label htmlFor="cinfo-address" className={`cinfo-label ${address.length? 'active' : ''}`}>{errors.address? errors.address.message :'Address'}</label>
                        </div>
                        <div className={`cinfo ${errors.addressTwo? 'error' : '' }`}>
                            <input id="cinfo-address-2" className="cinfo-input"
                            { ...register("addressTwo", { required: false })}                     
                            />
                            <label htmlFor="cinfo-address-2" className={`cinfo-label ${addressTwo.length? 'active' : ''}`}>{errors.addressTwo? errors.addressTwo.message :'Address 2'}</label>
                        </div>
                        <div className="cinfo-double">
                            <div className={`cinfo ${errors.city? 'error' : '' }`}>
                                <input id="cinfo-city" className="cinfo-input"
                                { ...register("city", { required: "City required"})}                     
                                />
                                <label htmlFor="cinfo-city" className={`cinfo-label ${city.length? 'active' : ''}`}>{errors.city? errors.city.message :'City'}</label>
                            </div>
                            <div className={`cinfo ${errors.province? 'error' : '' }`}>
                                <input id="cinfo-province" className="cinfo-input"
                                { ...register("province", { required: "Province required"})}                     
                                />
                                <label htmlFor="cinfo-province" className={`cinfo-label ${province.length? 'active' : ''}`}>{errors.province? errors.province.message :'Province/State'}</label>
                            </div>
                        </div>
                        <div className="cinfo-double">
                            <div className={`cinfo ${errors.code? 'error' : '' }`}>
                                <input id="cinfo-code" className="cinfo-input"
                                { ...register("code", { required: "Postal code required"})}                     
                                />
                                <label htmlFor="cinfo-code" className={`cinfo-label ${code.length? 'active' : ''}`}>{errors.code? errors.code.message :'Postal/Zip Code'}</label>
                            </div>
                            <div className={`cinfo ${errors.country? 'error' : '' }`}>
                                <input id="cinfo-country" className="cinfo-input"
                                { ...register("country", { required: "Country required"})}                     
                                />
                                <label htmlFor="cinfo-country" className={`cinfo-label ${country.length? 'active' : ''}`}>{errors.country? errors.country.message :'Country'}</label>
                            </div>
                        </div>
                        <div className={`cinfo ${errors.phone? 'error' : '' }`}>
                            <input id="cinfo-phone" className="cinfo-input"
                            { ...register("phone", { required: "Phone number required"})}                     
                            />
                            <label htmlFor="cinfo-phone" className={`cinfo-label ${phone.length? 'active' : ''}`}>{errors.phone? errors.phone.message :'Phone'}</label>
                        </div>
                        <div className={`cinfo ${errors.email? 'error' : '' }`}>
                            <input id="cinfo-email" className="cinfo-input"
                            { ...register("email", { required: "Email required"})}                     
                            />
                            <label htmlFor="cinfo-email" className={`cinfo-label ${email.length? 'active' : ''}`}>{errors.email? errors.email.message :'Email'}</label>
                        </div>
                </div>
                <div className="billing">
                    <div className="head">
                        <div className="title"> Payment </div>
                    </div>
                    <input type="radio" defaultChecked/>
                    <label>Debit/Credit</label>
                    <div className="debit-credit">
                        <div className={`cinfo ${errors.cardnum? 'error' : '' }`}>
                            <input className="cinfo-input" id="cinfo-cardnum" type="number"
                            { ...register("cardnum", { required: "Invalid card number"})}                     
                            />
                            <label className={`cinfo-label ${cardnum.length ? 'active' : ''}`} 
                            htmlFor="cinfo-cardnum">{errors.cardnum? errors.cardnum.message : 'Card Number'}</label>
                        </div>
                        <div className={`cinfo ${errors.cardname? 'error' : '' }`}>
                            <input className="cinfo-input" id="cinfo-cardname"
                            { ...register("cardname", { required: "Inavlid name"})}                     
                            />
                            <label className={`cinfo-label ${cardname.length ? 'active' : ''}`} 
                            htmlFor="cinfo-cardname">{errors.cardname? errors.cardname.message : 'Name'}</label>
                        </div>
                        <div className="cinfo-double">
                            <div className={`cinfo ${errors.expdate? 'error' : '' }`}>
                                <input className="cinfo-input" id="cinfo-expdate"
                                { ...register("expdate", { required: "Invalid expiration date"})}                     
                                />
                                <label className={`cinfo-label ${expdate.length ? 'active' : ''}`} 
                                htmlFor="cinfo-expdate">{errors.expdate? errors.expdate.message : 'MM/YY'}</label>
                            </div>
                            <div className={`cinfo ${errors.cvv? 'error' : '' }`}>
                                <input className="cinfo-input" id="cinfo-cvv"
                                { ...register("cvv", { required: "Invalid security code"})}                     
                                />
                                <label className={`cinfo-label ${cvv.length ? 'active' : ''}`} 
                                htmlFor="cinfo-cvv">{errors.cvv? errors.cvv.message : 'CVV'}</label>
                            </div>
                        </div>
                    </div>
                    <input type="checkbox" 
                    defaultChecked={checked}
                    className="billing-checkbox" 
                    onChange={() => setChecked(!checked)} />
                    <label htmlFor="checkbox">Billing Address same as shipping</label>
                    <div className="billing-form">
                        <div className = "cinfo-double">
                            <div className={`cinfo ${errors.bfirstname? 'error' : '' }`}>
                                <input 
                                    id="binfo-fname" 
                                    className="cinfo-input"
                                    { ...register("bfirstname", { required: "First name required" })}                     
                                    />
                                <label htmlFor="binfo-fname" className={`cinfo-label ${bfirstname.length? 'active' : ''}`}>{errors.bfirstname? errors.bfirstname.message :'First Name'}</label>
                            </div>
                            <div className={`cinfo ${errors.blastname? 'error' : '' }`}>
                                <input id="binfo-lname" className="cinfo-input" 
                                { ...register("blastname", { required: "Last name required" })}                     
                                />
                                <label htmlFor="binfo-lname" className={`cinfo-label ${blastname.length? 'active' : ''}`}>{errors.blastname? errors.blastname.message :'Last Name'}</label>
                            </div>
                        </div>
                        <div className={`cinfo ${errors.baddress? 'error' : '' }`}>
                            <input id="binfo-address" className="cinfo-input"
                            { ...register("baddress", { required: "Address required" })}                     
                            />
                            <label htmlFor="binfo-address" className={`cinfo-label ${baddress.length? 'active' : ''}`}>{errors.baddress? errors.baddress.message :'Address'}</label>
                        </div>
                        <div className={`cinfo ${errors.baddressTwo? 'error' : '' }`}>
                            <input id="binfo-address-2" className="cinfo-input"
                            { ...register("baddressTwo", { required: false })}                     
                            />
                            <label htmlFor="binfo-address-2" className={`cinfo-label ${baddressTwo.length? 'active' : ''}`}>{errors.baddressTwo? errors.addressTwo.message :'Address 2'}</label>
                        </div>
                        <div className="cinfo-double">
                            <div className={`cinfo ${errors.bcity? 'error' : '' }`}>
                                <input id="binfo-city" className="cinfo-input"
                                { ...register("bcity", { required: "City required"})}                     
                                />
                                <label htmlFor="binfo-city" className={`cinfo-label ${bcity.length? 'active' : ''}`}>{errors.bcity? errors.bcity.message :'City'}</label>
                            </div>
                            <div className={`cinfo ${errors.bprovince? 'error' : '' }`}>
                                <input id="binfo-province" className="cinfo-input"
                                { ...register("bprovince", { required: "Province required"})}                     
                                />
                                <label htmlFor="binfo-province" className={`cinfo-label ${bprovince.length? 'active' : ''}`}>{errors.bprovince? errors.bprovince.message :'Province/State'}</label>
                            </div>
                        </div>
                        <div className="cinfo-double">
                            <div className={`cinfo ${errors.bcode? 'error' : '' }`}>
                                <input id="binfo-code" className="cinfo-input"
                                { ...register("bcode", { required: "Postal code required"})}                     
                                />
                                <label htmlFor="binfo-code" className={`cinfo-label ${bcode.length? 'active' : ''}`}>{errors.bcode? errors.bcode.message :'Postal/Zip Code'}</label>
                            </div>
                            <div className={`cinfo ${errors.bcountry? 'error' : '' }`}>
                                <input id="binfo-country" className="cinfo-input"
                                { ...register("bcountry", { required: "Country required"})}                     
                                />
                                <label htmlFor="binfo-country" className={`cinfo-label ${bcountry.length? 'active' : ''}`}>{errors.bcountry? errors.bcountry.message :'Country'}</label>
                            </div>
                        </div>
                        <div className={`cinfo ${errors.bphone? 'error' : '' }`}>
                            <input id="binfo-phone" className="cinfo-input"
                            { ...register("bphone", { required: "Phone number required"})}                     
                            />
                            <label htmlFor="binfo-phone" className={`cinfo-label ${bphone.length? 'active' : ''}`}>{errors.bphone? errors.bphone.message :'Phone'}</label>
                        </div>
                        <div className={`cinfo ${errors.bemail? 'error' : '' }`}>
                            <input id="binfo-email" className="cinfo-input"
                            { ...register("bemail", { required: "Email required"})}                     
                            />
                            <label htmlFor="binfo-email" className={`cinfo-label ${bemail.length? 'active' : ''}`}>{errors.bemail? errors.bemail.message :'Email'}</label>
                        </div>
                    </div>
                </div>
                <div className="order-box">
                    <button type="submit" id="order" disabled={!formState.isValid}>Order</button>
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
                                    <img src={item.image} alt={`${item.namme}`}></img>
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