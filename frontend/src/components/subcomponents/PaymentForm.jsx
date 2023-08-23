

export default function PaymentForm({register, errors, watch, paymentType}) {

    const [cardname, cardnum, expdate, cvv] = watch(['cardname', 'cardnum', 'expdate', 'cvv'])

    return <div className="debit-credit" style={paymentType!=="credit"? {display: 'none'} : {}}>
                <div className={`cinfo ${errors.cardnum? 'error' : '' }`}>
                    <input 
                        className="cinfo-input" 
                        id="cinfo-cardnum" 
                        type="number"
                        { ...register("cardnum", { required: paymentType==='credit' ? "Invalid card number" : paymentType==='paypal' ? false : true })}                     
                    />
                    <label 
                        className={`cinfo-label ${cardnum.length ? 'active' : ''}`} 
                        htmlFor="cinfo-cardnum">
                    {errors.cardnum? errors.cardnum.message : 'Card Number'}
                    </label>
                </div>
                <div className={`cinfo ${errors.cardname? 'error' : '' }`}>
                    <input 
                        className="cinfo-input" 
                        id="cinfo-cardname"
                        { ...register("cardname", { required: paymentType==='credit' ? "Invalid name" : paymentType==='paypal' ? false : true })}                     
                    />
                    <label 
                        className={`cinfo-label ${cardname.length ? 'active' : ''}`} 
                        htmlFor="cinfo-cardname">
                    {errors.cardname? errors.cardname.message : 'Name on card'}
                    </label>
                </div>
                <div className="cinfo-double">
                    <div className={`cinfo ${errors.expdate? 'error' : '' }`}>
                        <input 
                            className="cinfo-input" 
                            id="cinfo-expdate" 
                            placeholder="MM/YY"
                            { ...register("expdate", { required: paymentType==='credit' ? "Invalid expiration date" : paymentType==='paypal' ? false : true })}                     
                        />
                        <label 
                            className={`cinfo-label ${expdate.length ? 'active' : ''}`} 
                            htmlFor="cinfo-expdate">
                        {errors.expdate? errors.expdate.message : 'Expiration Date'}
                        </label>
                    </div>
                    <div className={`cinfo ${errors.cvv? 'error' : '' }`}>
                        <input 
                            className="cinfo-input" 
                            id="cinfo-cvv"
                            { ...register("cvv", { required: paymentType==='credit' ? "Invalid security code" : paymentType==='paypal' ? false : true })}                     
                        />
                        <label 
                            className={`cinfo-label ${cvv.length ? 'active' : ''}`} 
                            htmlFor="cinfo-cvv">
                        {errors.cvv? errors.cvv.message : 'CVV'}
                        </label>
                    </div>
                </div>
            </div>
}