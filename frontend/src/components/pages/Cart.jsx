import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Cart.css'

export function Cart({userId, cart, setCart}) {

    const [ subtotal, setSubtotal ] = useState(0)

    //subtotal
    useEffect( () => {
        setSubtotal(cart.reduce((acc, item) => acc + Number.parseInt(item.price) * item.qty, 0))
    }, [cart])

    useEffect(() => {
        const ec = localStorage.getItem('ECOMMERCE_CART')
        const ls = JSON.parse(ec ? ec : "[]")

        if (userId > 0) {
            let isMounted = true;
            const controller = new AbortController();
            const signal = controller.signal;

            // move localstorage items to db cart
            axios.post(
                "/api/carts/mycart/items/multi", 
                { items: ls })
                .then(res => {
                    if (isMounted) {
                        localStorage.removeItem('ECOMMERCE_CART')
                        localStorage.removeItem('ECOMMERCE_ITEMID')
                    }
                })
                .catch(err => console.log(err))    

            // get cart from db
            axios.get("/api/carts/mycart", {signal: signal})
                .then(res => {
                    if (isMounted) {
                        setCart(res.data.items)
                    }
                })
                .catch(err => console.log(err))

            return () => {
                isMounted = false;
                isMounted && controller.abort()
            }
        } else {
            setCart(ls)
        } 
    
    }, [setCart, userId])

    //remove item from cart
    const removeItem = (cartitemid) => {
        let updatedCart = cart.filter(x=> (x.cartitemid !== cartitemid));
        if (userId > 0) {
            axios.delete(`/api/carts/mycart/items/${cartitemid}`)
            .then(res => {
                setCart(updatedCart)
            })
            .catch(err => console.log(err))
        } else {
            localStorage.setItem('ECOMMERCE_CART', JSON.stringify(updatedCart))
            setCart(updatedCart)
        }
    }

    const updateItem = (bool, cartitemid, qty, productid, cartid) => {
        if (bool)
            qty++;
        else {
            if (qty === 1)
                return;
            qty--
        }
        
        let updatedCart = cart.splice(0).map(x=> {
            if (x.cartitemid===cartitemid)
                x['qty']=qty;
            return x;
        })
        if (userId > 0) {
            axios.put(`/api/carts/mycart/items/${cartitemid}`, 
                {qty, productid, cartid})
            .then(res => setCart(updatedCart))
            .catch(err => console.log(err))
        } else {
            localStorage.setItem('ECOMMERCE_CART', JSON.stringify(updatedCart))
            setCart(updatedCart)
        }

    }        
    return (
        <div className="cart">
            <div className="cart-box">
                <div className="head">
                    <div id="title"> CART </div>
                </div>
                <div className="items">
                    {cart.length ?
                        <></>
                        :<div className="cart-r-empty">Your cart is empty</div>
                    }
                    {cart.slice(0).reverse().map(item => {
                    return (
                        <div className="item" key={item.cartitemid}>
                            <div className="prod-img">
                                <Link to={`/products/${item.id}`}>
                                    <img src={item.image}></img>
                                </Link>
                            </div>
                            <div className="prod-info">
                                <div className="info">
                                    <div className="name-price">
                                        <Link to={`/products/${item.id}`}>
                                            <div id="name">{item.name}</div>
                                        </Link>
                                        <div id="price">$ {item.price}</div>
                                    </div>
                                    {/* <div id="description">{item.description}</div> */}
                                    <div id="category">{item.category}</div>
                                    <div className="qty-edit">
                                        <div id="qty">Qty {item.qty}</div>
                                        <button id="add-button" onClick={() => updateItem(true, item.cartitemid, item.qty, item.id, item.cartid)}>+</button>
                                        <button id="sub-button" onClick={() => updateItem(false, item.cartitemid, item.qty, item.id, item.cartid)}>-</button>
                                    </div>
                                </div>
                                <button id="remove-button" onClick={() => removeItem(item.cartitemid)}>Remove</button>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
            <div className="summary-box">
                <div className="head">
                    <div id="title"> SUMMARY </div>
                </div>
                <div className="subtotal-box">
                    <div id="subtotal">Subtotal</div>
                    <div id="value">{cart.length ? <>$ {subtotal}</> :<div>—</div>}</div>
                </div>
                <div className="shipping-handling-box">
                    <div id="shipping-handling">Estimated Shipping & Handling</div>
                    <div id="value">—</div>
                </div>
                <div className="tax-box">
                    <div id="tax">Estimated Tax</div>
                    <div id="value">—</div>
                </div>
                <div className="total-box">
                    <div id="total">Total</div>
                    <div id="value">—</div>
                </div>

                <div className="checkout-box">
                    <Link id="checkout" to={`./`}>Checkout</Link>
                </div>
            </div>
        </div>
    )
}