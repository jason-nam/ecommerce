import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios"
import './Checkout.css'
import PaymentType from './PaymentType'
import PaymentForm from './PaymentForm'
import CustomerForm from './CustomerForm'
import CheckoutSummary from './CheckoutSummary'
import FormSummary from './FormSummary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export function Checkout({userId, cart, setCart, subtotal, stateCH, orderToast, dispatchCH}) {

    const navigate = useNavigate()
    //billing checkbox
    const [ billingChecked, setBillingChecked ] = useState(true)
    const shippingRef = useRef(null)
    const billingRef = useRef(null)

    //form
    const { register, watch, handleSubmit, formState: { errors }, setValue, trigger } = useForm({
        mode: "onBlur",
        defaultValues: {
            firstname: '', lastname: '', address: '', addressTwo: '', 
            city: '', province: '', postalCode: '', country:'CA', 
            phone:'', email: '', paymentType: 'credit',
            cardname: '', cardnum: '', expdate: '', cvv: '',
            bfirstname: '', blastname: '', baddress: '', baddressTwo: '', 
            bcity: '', bprovince: '', bpostalCode: '', bcountry: 'CA', bphone: '', bemail: ''    
        }
    });
    const [firstname, lastname, address, addressTwo, 
        city, province, postalCode, country, phone, email, 
        bfirstname, blastname, baddress, baddressTwo,
        bcity, bprovince, bpostalCode, bcountry, bphone, bemail,
        paymentType
    ] = watch([
            'firstname', 'lastname', 'address', 'addressTwo', 
            'city', 'province', 'postalCode', 'country', 'phone', 'email', 
            'bfirstname', 'blastname', 'baddress', 'baddressTwo', 
            'bcity', 'bprovince', 'bpostalCode', 'bcountry', 'bphone', 'bemail', 
            'paymentType'
        ])

    //logged in => autofill
    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        if (userId > 0) {
            axios.get(`/api/shipping`, {signal: controller.signal})
            .then(res => {
                if (isMounted) {
                    let user = res.data.rows[0]
                    setValue("firstname", user.first_name? user.first_name : "")
                    setValue("lastname", user.last_name? user.last_name: "")
                    setValue("email", user.email ? user.email : "")
                    setValue("phone", user.phone_number ? user.phone_number : "")
                    setValue("address", user.addr_line_1 ? user.addr_line_1 : "")
                    setValue("city", user.addr_city ? user.addr_city : "")
                    setValue("province", user.addr_province ? user.addr_province : "")
                    setValue("country", user.addr_country ? user.addr_country : "CA")
                    setValue("postalCode", user.addr_postal ? user.addr_postal : "")
                    setValue("addressTwo", user.addr_line_2 ? user.addr_line_2 : "")
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
            setValue("bpostalCode", postalCode)
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
            setValue("bpostalCode", '')
            setValue("bphone", '')
            setValue("bemail", '')
        } 
    }, [billingChecked, firstname, lastname, address, addressTwo, city, province, postalCode, phone, email])

    //submit order
    const submitOrder = (data, e) => {
        e.preventDefault();
        if (!cart.length) return;

        let shipDetails = { 
            firstname: data.firstname,
            lastname: data.lastname,
            address: data.address,
            address2: data.addressTwo,
            city: data.city,
            province: data.province,
            country: data.country,
            postalCode: data.postalCode,
            email: data.email,
            phone: data.phone,
        }

        let paymentType = data.paymentType;
        let cardDetails = paymentType === 'credit' ? {
            name: data.cardname,
            num: data.cardnum,
            cvv: data.cvv,
            exp: data.expdate, 
        } : paymentType === 'paypal' ? {} : null;
        if (cardDetails===null) return;

        let billDetails = { 
            firstname: data.bfirstname,
            lastname: data.blastname,
            address: data.baddress,
            address2: data.baddressTwo,
            city: data.bcity,
            province: data.bprovince,
            country: data.bcountry,
            postalCode: data.bpostalCode,
            email: data.bemail,
            phone: data.bphone,
        }
        let paymentInfo = { shipDetails, cardDetails, billDetails }

        axios.post("/api/carts/checkout", 
            {
                paymentinfo: data, 
                cart, 
                userId 
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
                    <div className="shipping show" ref={shippingRef}>
                        <div className="head">
                            <div className="title"> Shipping </div>
                        </div>
                        {userId > 0 ? null: <Link to="/login" className="link">Sign in for a better experience</Link>}
                        <CustomerForm 
                            {...{register, errors, setValue, firstname, lastname, address, addressTwo, 
                                city, province, postalCode, country, phone, email, trigger}}
                            formType={1}
                        />
                    </div>
                    <FormSummary {...{watch, trigger, shippingRef, billingRef}}/>
                    <div className="billing dn" ref={billingRef}>
                        <div className="head">
                            <div className="title"> Payment </div>
                        </div>
                        <PaymentType {...{register}}/>
                        <PaymentForm {...{register, errors, watch, paymentType, setValue}}/>
                        <div className="billing-checkbox-container" 
                        style={paymentType=="paypal"? {display: 'none'} : {}}
                        >
                            <input type="checkbox" 
                                id="billing-checkbox"
                                defaultChecked={billingChecked}
                                className="billing-checkbox" 
                                onChange={() => setBillingChecked(!billingChecked)} />
                            <span className="billing-checkbox-box"></span>
                            <FontAwesomeIcon icon={faCheck} className="faCheck" />
                            <label 
                                htmlFor="billing-checkbox" 
                                className="checkbox-label" 
                            >Billing Address same as shipping</label>
                        </div>
                        <CustomerForm 
                            {...{register, errors, setValue, trigger, billingChecked}}
                            formType={0}
                            firstname={bfirstname}
                            lastname={blastname} 
                            address={baddress}
                            addressTwo={baddressTwo}
                            city={bcity}
                            province={bprovince} 
                            postalCode={bpostalCode}
                            country={bcountry}
                            phone={bphone}
                            email={bemail}
                        />
                    </div>
                    <div className="order-box dn">
                        <button type="submit" id="order" 
                        disabled = {!cart.length}
                        // disabled={!formState.isValid}
                        >{ paymentType=="credit" ? "Order" : "Pay with Paypal"}</button>
                    </div>
                </form>
            </div>
            <CheckoutSummary {...{subtotal, stateCH, cart}} />
        </div>
    )
}