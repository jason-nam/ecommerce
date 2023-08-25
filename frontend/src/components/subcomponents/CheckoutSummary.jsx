import { Link } from 'react-router-dom'

export default function CheckoutSummary ({subtotal, stateCH, cart}) {

    const { tax, shipping, total } = stateCH;

    return  <div className="right-ch">
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
                    <Link to="/cart" className="link">Edit</Link>
                    <div className="items-ch">
                        {cart.slice(0).reverse().map(item => {
                        return (
                            <div key={item.cartitemid}>
                            <div className="lines"></div>
                            <div className="item-ch" >
                                <div className="item-ch-img">
                                    <img src={item.image.split(', ')[0]} alt={`${item.name}`}></img>
                                </div>
                                <div className="item-info-ch">
                                    <div className="info-left">
                                        <div className="name">{item.name}</div>
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
}