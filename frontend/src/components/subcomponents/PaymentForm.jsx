import validator from 'validator'
import moment from 'moment'

export default function PaymentForm({register, errors, watch, paymentType, setValue}) {

    const [cardname, cardnum, expdate, cvv] = watch(['cardname', 'cardnum', 'expdate', 'cvv'])

    const setExpDate = (e) => {
        //delete slash and second digit
        if (expdate.length === 3 && (e.key === "Delete" || e.key === "Backspace")) {
            setValue('expdate', expdate.slice(0,2))
        }
        // add slash
        if (expdate.length === 2 && e.key !== "Delete" && e.key !== "Backspace") {
            setValue('expdate', expdate.slice(0,2) + "/")
        }
        // numbers only
        if (/^[a-zA-Z\s\+\-!@#$%^&*\(\)\=\~\`\?\/\<\>\,\.\_\'\"\;\:{\}\[\]\\\|]$/.test(e.key)) 
            e.preventDefault();
    }

    return <div className="debit-credit" style={paymentType!=="credit"? {display: 'none'} : {}}>
                <div className={`cinfo ${errors.cardnum? 'error' : '' }`}>
                    <input 
                        className="cinfo-input" 
                        id="cinfo-cardnum" 
                        onKeyDown={e => {
                            //numbers, space, and hyphen only
                            if (/^[a-zA-Z\+!@#$%^&*\(\)\=\~\`\?\/\<\>\,\.\_\'\"\;\:{\}\[\]\\\|]$/.test(e.key)) 
                                e.preventDefault()
                            }
                        }
                        { ...register("cardnum", { 
                            required: paymentType==='credit' ? "Card number required" : 
                            paymentType==='paypal' ? 
                            false : true,
                            validate: (v) => (paymentType==='credit' ? validator.isCreditCard(v) : true )|| "Invalid card number"
                        })}                     
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
                        { ...register("cardname", 
                        { 
                            required: paymentType==='credit' ? 
                            "Invalid name" : paymentType==='paypal' ? 
                            false : true,
                        })}                     
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
                            maxLength="5"
                            { ...register("expdate", { 
                                required: paymentType==='credit' ? "Invalid expiration date" : 
                                paymentType==='paypal' ? 
                                false : true, 
                                validate: (v) => (paymentType==='credit' ? (moment(v , "MM/YY").isValid() && moment(v , "MM/YY").diff(moment(), 'months') >= 0) : true) || "Invalid expiration date"
                            })}
                            onKeyDown={setExpDate}                   
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
                            maxLength="4"
                            onKeyDown={e => {
                                if (/^[a-zA-Z\s\+\-!@#$%^&*\(\)\=\~\`\?\/\<\>\,\.\_\'\"\;\:{\}\[\]\\\|]$/.test(e.key)) 
                                    e.preventDefault()
                                }
                            }
                            { ...register("cvv", { 
                                required: paymentType==='credit' ? "Invalid security code" : paymentType==='paypal' ? false : true,
                                validate: (v) => (paymentType==='credit' ? v.length < 5 && Number.isInteger(Number(v)) : true) || "Invalid security code"
                            })}                     
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