import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios"
import './Checkout.css'
import DropDown from '../subcomponents/DropDown'
import CheckoutSummary from '../subcomponents/CheckoutSummary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export function Checkout({userId, cart, setCart, subtotal, stateCH, orderToast, dispatchCH}) {

    const navigate = useNavigate()
    //billing checkbox
    const [ billingChecked, setBillingChecked ] = useState(true)
    //credit radio check
    const [ creditChecked, setCreditChecked ] = useState("credit")
    
    //form
    const { register, watch, handleSubmit, formState: { errors }, setValue, formState } = useForm({
        mode: "onChange",
        defaultValues: {
            firstname: '', lastname: '', address: '',
            addressTwo: '', city: '', province: '', 
            code: '', country:'CA', phone:'', email: '',
            cardname: '', cardnum: '', expdate: '', cvv: '',
            bfirstname: '', blastname: '', baddress: '', baddressTwo: '', 
            bcity: '', bprovince: '', bcode: '', bcountry: 'CA', bphone: '', bemail: ''    
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
        if (billingChecked) {
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
            setValue("bcountry", 'CA')
            setValue("bcode", '')
            setValue("bphone", '')
            setValue("bemail", '')
        } 
    }, [billingChecked, firstname, lastname, address, addressTwo, city, province, code, phone, email])

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
            dispatchCH({type: "RESET"})
            setCart([])
            if (userId > 0) {
                axios.delete("/api/carts/empty").then(res=> {
                    navigate("/orders")
                    orderToast("Order successful!")    
                })
                .catch(err => console.log(err))
            } else {
                localStorage.removeItem('ECOMMERCE_CART')
                localStorage.removeItem('ECOMMERCE_ITEMID')
                localStorage.setItem('GUEST_ORDER_CART', JSON.stringify(res.data.cartItems))
                localStorage.setItem('GUEST_ORDER_TOTAL', res.data.total)
                localStorage.setItem('GUEST_ORDER_DATE', res.data.created)
                localStorage.setItem('GUEST_ORDER_ID', res.data.id)
                navigate("/guest-order")
                orderToast("Order successful!")
            }
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
                                    type="text"
                                    className="cinfo-input"
                                    { ...register("firstname", { required: "First name required" })}                     
                                    />
                                <label htmlFor="cinfo-fname" className={`cinfo-label ${firstname.length? 'active' : ''}`}>{errors.firstname? errors.firstname.message :'First Name'}</label>
                            </div>
                            <div className={`cinfo ${errors.lastname? 'error' : '' }`}>
                                <input id="cinfo-lname" className="cinfo-input" type="text"
                                { ...register("lastname", { required: "Last name required" })}                     
                                />
                                <label htmlFor="cinfo-lname" className={`cinfo-label ${lastname.length? 'active' : ''}`}>{errors.lastname? errors.lastname.message :'Last Name'}</label>
                            </div>
                        </div>
                        <div className={`cinfo ${errors.address? 'error' : '' }`}>
                            <input id="cinfo-address" className="cinfo-input" type="text"
                            { ...register("address", { required: "Address required" })}                     
                            />
                            <label htmlFor="cinfo-address" className={`cinfo-label ${address.length? 'active' : ''}`}>{errors.address? errors.address.message :'Address'}</label>
                        </div>
                        <div className={`cinfo ${errors.addressTwo? 'error' : '' }`}>
                            <input id="cinfo-address-2" className="cinfo-input" type="text"
                            { ...register("addressTwo", { required: false })}                     
                            />
                            <label htmlFor="cinfo-address-2" className={`cinfo-label ${addressTwo.length? 'active' : ''}`}>{errors.addressTwo? errors.addressTwo.message :'Address 2'}</label>
                        </div>
                        <div className="cinfo-double">
                            <div className={`cinfo ${errors.city? 'error' : '' }`}>
                                <input id="cinfo-city" className="cinfo-input" type="text"
                                { ...register("city", { required: "City required"})}                     
                                />
                                <label htmlFor="cinfo-city" className={`cinfo-label ${city.length? 'active' : ''}`}>{errors.city? errors.city.message :'City'}</label>
                            </div>
                            <div className={`cinfo ${errors.province? 'error' : '' }`}>
                                <DropDown which={'province'} register={register} country={country}/>
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
                                <DropDown which={'country'} register={register}/>
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
                            { ...register("email", 
                                {
                                    required: "Email required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please enter a valid email address."
                                    }
                                }
                            )}                     
                            />
                            <label htmlFor="cinfo-email" className={`cinfo-label ${email.length? 'active' : ''}`}>{errors.email? errors.email.message :'Email'}</label>
                        </div>
                </div>
                <div className="billing">
                    <div className="head">
                        <div className="title"> Payment </div>
                    </div>
                    <div className="radio-buttons-group">
                        <div className="radio-button-container">
                            <input type="radio" 
                                name="payment-type" 
                                id="debit-credit-radio" 
                                className="radio-button" 
                                value="credit" 
                                defaultChecked={creditChecked} 
                                onChange={e => setCreditChecked(e.target.value)} 
                            />
                            <label htmlFor="debit-credit-radio" className="radio-button-label">Credit</label>
                        </div>
                        <div className="radio-button-container">
                            <input type="radio" 
                                name="payment-type" 
                                id="paypal-radio" 
                                className="radio-button" 
                                value="paypal" 
                                onChange={e => setCreditChecked(e.target.value)} 
                            />
                            <label htmlFor="paypal-radio" className="radio-button-label">Paypal</label>
                        </div>
                    </div>
                    <div className="debit-credit" style={creditChecked!=="credit"? {display: 'none'} : {}}>
                        <div className={`cinfo ${errors.cardnum? 'error' : '' }`}>
                            <input className="cinfo-input" id="cinfo-cardnum" type="number"
                            { ...register("cardnum", { required: "Invalid card number"})}                     
                            />
                            <label className={`cinfo-label ${cardnum.length ? 'active' : ''}`} 
                            htmlFor="cinfo-cardnum">{errors.cardnum? errors.cardnum.message : 'Card Number'}</label>
                        </div>
                        <div className={`cinfo ${errors.cardname? 'error' : '' }`}>
                            <input className="cinfo-input" id="cinfo-cardname"
                            { ...register("cardname", { required: "Invalid name"})}                     
                            />
                            <label className={`cinfo-label ${cardname.length ? 'active' : ''}`} 
                            htmlFor="cinfo-cardname">{errors.cardname? errors.cardname.message : 'Name on card'}</label>
                        </div>
                        <div className="cinfo-double">
                            <div className={`cinfo ${errors.expdate? 'error' : '' }`}>
                                <input className="cinfo-input" id="cinfo-expdate" placeholder="MM/YY"
                                { ...register("expdate", { required: "Invalid expiration date"})}                     
                                />
                                <label className={`cinfo-label ${expdate.length ? 'active' : ''}`} 
                                htmlFor="cinfo-expdate">{errors.expdate? errors.expdate.message : 'Expiration Date'}</label>
                            </div>
                            <div className={`cinfo ${errors.cvv? 'error' : '' }`}>
                                <input className="cinfo-input" id="cinfo-cvv"
                                { ...register("cvv", { required: "A security code is a 3 digits security number"})}                     
                                />
                                <label className={`cinfo-label ${cvv.length ? 'active' : ''}`} 
                                htmlFor="cinfo-cvv">{errors.cvv? errors.cvv.message : 'CVV'}</label>
                            </div>
                        </div>
                    </div>
                    <input type="checkbox" 
                    id="billing-checkbox"
                    defaultChecked={billingChecked}
                    className="billing-checkbox" 
                    onChange={() => setBillingChecked(!billingChecked)} />
                    <span className="billing-checkbox-box"></span>
                    <FontAwesomeIcon icon={faCheck} className="faCheck" />
                    <label htmlFor="billing-checkbox" className="checkbox-label">Billing Address same as shipping</label>
                    <div className="billing-form">
                        <div className = "cinfo-double">
                            <div className={`cinfo ${errors.bfirstname? 'error' : '' }`}>
                                <input 
                                    id="binfo-fname" 
                                    className="cinfo-input"
                                    type="text"
                                    { ...register("bfirstname", { required: "First name required" })}                     
                                    />
                                <label htmlFor="binfo-fname" className={`cinfo-label ${bfirstname.length? 'active' : ''}`}>{errors.bfirstname? errors.bfirstname.message :'First Name'}</label>
                            </div>
                            <div className={`cinfo ${errors.blastname? 'error' : '' }`}>
                                <input id="binfo-lname" className="cinfo-input" type="text"
                                { ...register("blastname", { required: "Last name required" })}                     
                                />
                                <label htmlFor="binfo-lname" className={`cinfo-label ${blastname.length? 'active' : ''}`}>{errors.blastname? errors.blastname.message :'Last Name'}</label>
                            </div>
                        </div>
                        <div className={`cinfo ${errors.baddress? 'error' : '' }`}>
                            <input id="binfo-address" className="cinfo-input" type="text"
                            { ...register("baddress", { required: "Address required" })}                     
                            />
                            <label htmlFor="binfo-address" className={`cinfo-label ${baddress.length? 'active' : ''}`}>{errors.baddress? errors.baddress.message :'Address'}</label>
                        </div>
                        <div className={`cinfo ${errors.baddressTwo? 'error' : '' }`}>
                            <input id="binfo-address-2" className="cinfo-input" type="text"
                            { ...register("baddressTwo", { required: false })}                     
                            />
                            <label htmlFor="binfo-address-2" className={`cinfo-label ${baddressTwo.length? 'active' : ''}`}>{errors.baddressTwo? errors.addressTwo.message :'Address 2'}</label>
                        </div>
                        <div className="cinfo-double">
                            <div className={`cinfo ${errors.bcity? 'error' : '' }`}>
                                <input id="binfo-city" className="cinfo-input" type="text"
                                { ...register("bcity", { required: "City required"})}                     
                                />
                                <label htmlFor="binfo-city" className={`cinfo-label ${bcity.length? 'active' : ''}`}>{errors.bcity? errors.bcity.message :'City'}</label>
                            </div>
                            <div className={`cinfo ${errors.bprovince? 'error' : '' }`}>
                                <DropDown which={'bprovince'} register={register} country={bcountry}/>
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
                                <DropDown which={'bcountry'} register={register} />
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
                            { ...register("bemail", 
                            {
                                required: "Email required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address."
                                }
                            }
                        )}                     
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
            <CheckoutSummary {...{subtotal, stateCH, cart}} />
        </div>
    )
}