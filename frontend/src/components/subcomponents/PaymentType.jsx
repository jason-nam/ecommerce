
export default function({creditChecked, setCreditChecked}) {
    return <div className="radio-buttons-group">
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

}