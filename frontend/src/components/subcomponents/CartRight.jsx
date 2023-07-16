import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"


export default function Cart({userId}) {
    const [localCart, setLocalCart] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (userId > 0) {
            let isMounted = true;
            const controller = new AbortController();
            const signal = controller.signal;

            // move localstorage items to db cart
            axios.post(
                "/api/carts/mycart/items/multi", 
                { items: localCart })
                .then(res => {
                    if (isMounted) {
                        console.log(res.data.cart)
                        setLocalCart([])
                        localStorage.removeItem('ECOMMERCE_CART')
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
            // get cart from local storage
            const data = localStorage.getItem('ECOMMERCE_CART')
            setLocalCart(JSON.parse(data ? data : "[]"))
            setCart(JSON.parse(data ? data : "[]"))
        } 

    
    }, [setCart, setLocalCart, userId])

    console.log(cart)


    return (
        <div>
            {cart.map(item => {
            return (
                <div key={item.cartitemid}>
                    <Link to={`/products/${item.id}`}>
                        <img src={item.image} width='150px'></img>
                        <div>{item.name}</div>
                        <div>{item.description}</div>
                    </Link>
                    <Link to={`/products?category=${item.category}`}>
                        <div>{item.category}</div>
                    </Link>
                </div>
            )
        })}</div>
    )

}

