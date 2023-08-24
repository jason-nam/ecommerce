import { useRef } from 'react'

export default function FormSummary({watch, trigger, shippingRef, billingRef}) {

    const [firstname, lastname, address, addressTwo, 
        city, province, postalCode, country, phone, email] = watch([
            'firstname', 'lastname', 'address', 'addressTwo', 
            'city', 'province', 'postalCode', 'country', 'phone', 'email', 
        ])

    const summaryRef = useRef(null)

    const validShipping = async () => {
        if (await trigger(['firstname', 'lastname', 'address', 'addressTwo', 
        'city', 'province', 'postalCode', 'country', 'phone', 'email'])) {
            shippingRef.current.style.display = 'none';
            summaryRef.current.style.display = "flex";
            summaryRef.current.nextSibling.style.display = "none";
            billingRef.current.style.display = "block"
            billingRef.current.nextSibling.style.display = "flex"
        }
    }

    const editForm = () => {
        shippingRef.current.style.display = 'flex';
        summaryRef.current.style.display = "none";
        summaryRef.current.nextSibling.style.display = "block";
        billingRef.current.style.display = "none"
        billingRef.current.nextSibling.style.display = "none"
    }

    return <>
                <div className="shipping-summary" ref={summaryRef}>
                    <div className="head">
                        <div className="title"> Shipping Info </div>
                        <button type="button" onClick={editForm}>Edit</button>
                    </div>
                    <span>{firstname} {lastname},</span>
                    <span>{address},</span>
                    {addressTwo? <span>{addressTwo},</span> : null}
                    <span>{city}, {province}, {postalCode}</span>
                    <span>{country}</span>
                    <span>{email}</span>
                    <span>{phone}</span>
                </div>
                <div className="proceed-box">
                        <button type="button" 
                            id="proceed" 
                            onClick={validShipping}
                            >
                            Payment
                        </button>
                    </div>
            </>

}