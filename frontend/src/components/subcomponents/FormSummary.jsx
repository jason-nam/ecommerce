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
            shippingRef.current.classList.replace('show', 'dn');
            summaryRef.current.classList.replace('dn', 'show');
            summaryRef.current.nextSibling.classList.replace('show', 'dn'); //payment button
            billingRef.current.classList.replace('dn', 'show');
            billingRef.current.scrollIntoView({ behavior: 'smooth' });
            billingRef.current.nextSibling.classList.replace('dn', 'show'); // order button
        }
    }

    const editForm = () => {
        shippingRef.current.classList.replace('dn', 'show');
        shippingRef.current.scrollIntoView({ behavior: 'smooth' });
        summaryRef.current.classList.replace('show', 'dn');
        summaryRef.current.nextSibling.classList.replace('dn', 'show'); //payment button
        billingRef.current.classList.replace('show', 'dn')
        billingRef.current.nextSibling.classList.replace('show', 'dn') //order button
    }

    return <>
                <div className="shipping-summary dn" ref={summaryRef}>
                    <div className="head">
                        <div className="title"> Shipping Info </div>
                        <button type="button" onClick={editForm} className="edit-button">Edit</button>
                    </div>
                    <span>{firstname} {lastname},</span>
                    <span>{address},</span>
                    {addressTwo? <span>{addressTwo},</span> : null}
                    <span>{city}, {province}, {postalCode}</span>
                    <span>{country}</span>
                    <span>{email}</span>
                    <span>{phone}</span>
                </div>
                <div className="proceed-box show">
                        <button type="button" 
                            id="proceed" 
                            onClick={validShipping}
                            >
                            Payment
                        </button>
                    </div>
            </>

}