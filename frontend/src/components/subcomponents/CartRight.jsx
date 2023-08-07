import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './CartRight.css'

export default function CartRight({userId, cart, setCart}) {

    const [ subtotal, setSubtotal ] = useState(0)

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

    //subtotal
    useEffect( () => {
        setSubtotal(cart.reduce((acc, item) => acc + Number.parseInt(item.price) * item.qty, 0))
    }, [cart])

    // close cart
    const cartRef = useRef(null)
    const closeRef = useRef(null)
    const cartPageRef = useRef(null)

    useEffect( () => {
        document.addEventListener('click', e => {
            if ((cartRef.current && !cartRef.current.contains(e.target)) ||
                (closeRef.current && closeRef.current.contains(e.target)) ||
                (cartPageRef.current && cartPageRef.current.contains(e.target)))
            {
                cartRef.current.classList.remove('active');
            }
        }, { capture: true })
    },[])

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
        if (bool) {
            qty++;
        } else {
            if (qty === 1) {
                return;
            }
            qty--
        }
        
        let updatedCart = cart.splice(0).map(x=> {
            if (x.cartitemid===cartitemid) {
                x['qty']=qty;
            }
            return x;
        })
        if (userId > 0) {
            axios.put(`/api/carts/mycart/items/${cartitemid}`, {qty, productid, cartid})
                .then(res => setCart(updatedCart))
                .catch(err => console.log(err))
        } else {
            localStorage.setItem('ECOMMERCE_CART', JSON.stringify(updatedCart))
            setCart(updatedCart)
        }

    }
        
    return (
        <div className='cart-r' ref={cartRef}>
            
            <div className="head">
                <div id="title"> Shopping Bag </div>
                <div id="close-cart" ref={closeRef}>&times;</div>
            </div>

            <div className="items">
                {cart.length ?
                    <></>
                    :<div className="cart-r-empty">Your cart is empty</div>
                }
                {cart.slice(0).reverse().map(item => {
                    return (
                        <div className="item" key={item.cartitemid}>
                            <div className="item-container">
                                <div className="image">
                                    <a href={`/products/${item.id}`}>
                                        <img className='cartitem-img' src={item.image}></img>
                                    </a>
                                </div>
                                <div className="info-text-container">
                                    <div className="item-top">
                                        <a href={`/products/${item.id}`} className="bag-name">
                                            {item.name}
                                        </a>
                                        <a href={`/products?category=${item.category}`} className="bag-category">
                                            {item.category}
                                        </a>
                                    </div>
                                    <div className="item-bottom">
                                        <div className="bag-qty">Qty: {item.qty}</div>
                                        <div className="bag-price">${item.price}</div>
                                        <button className="remove-cart" onClick={() => removeItem(item.cartitemid)}>Remove</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="foot">
                <div className="total">
                    <div id="name">Subtotal</div>
                    <div id="value">{cart.length ? <>$ {subtotal}</> :<div>—</div>}</div>
                </div>
                <Link to="/carts/mycart" id="view-cart" ref={cartPageRef}>View Cart</Link>
            </div>

        </div>
    )
}