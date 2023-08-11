import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './CartRight.css'
import { removeItem, updateItem } from '../../utils/util'

export default function CartRight({userId, cart, setCart, cartRef}) {

    const [ subtotal, setSubtotal ] = useState(0)
    const closeRef = useRef(null)
    const cartPageRef = useRef(null)

    //subtotal
    useEffect( () => {
        setSubtotal(cart.reduce((acc, item) => acc + Number.parseInt(item.price) * item.qty, 0))
    }, [cart])
    
    useEffect(() => {

        const ec = localStorage.getItem('ECOMMERCE_CART')
        let ls = JSON.parse(ec ? ec : "[]")

        if (userId > 0) {
            let isMounted = true;
            const controller = new AbortController();
            const signal = controller.signal;

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
    
    // close cart
    useEffect( () => {
        document.addEventListener('click', e => {
            if ((cartRef.current && !cartRef.current.contains(e.target)) ||
                (closeRef.current && closeRef.current.contains(e.target)) ||
                (cartPageRef.current && cartPageRef.current.contains(e.target)))
            {
                cartRef.current.classList.remove('active');
                document.body.classList.remove('modal');
            }
        }, { capture: true })
    },[])
        
    return (
        <div className='cart-r' ref={cartRef}>
            
            <div className="head">
                <div id="title"> Shopping Bag </div>
                <div id="close-cart" ref={closeRef}>&times;</div>
            </div>

            <div className="items">
                {cart.length ?
                    <></>
                    :<div className="cart-r-empty">Your bag is empty</div>
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
                                        <a href={`/products?category=${item.subcategory}`} className="bag-category">
                                            {item.subcategory}
                                        </a>
                                    </div>
                                    <div className="item-bottom">
                                        <div className="bag-qty">Qty: {item.qty}</div>
                                        <div className="bag-price">${item.price}</div>
                                        <button className="remove-cart" onClick={() => removeItem(item.cartitemid, cart, userId, setCart)}>Remove</button>

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