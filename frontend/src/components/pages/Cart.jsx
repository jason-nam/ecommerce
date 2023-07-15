import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"

// const localCart = JSON.parse(localStorage.getItem('ECOMMERCE_CART')? localStorage.getItem('ECOMMERCE_CART') : "[]")
// const localCart = [{id: 1, qty: 3, productid: 1, cartid: 1}]

export function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('ECOMMERCE_CART', JSON.stringify(cart))
        setCart(JSON.parse(data))
    },[cart])

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;
        axios.get("/api/carts/mycart", {signal: signal})
            .then(res => {
                if (isMounted) {
                    setCart([...cart, ...res.data.items])
                    // setCart(res.data.items)
                    // localStorage.removeItem('ECOMMERCE_CART')
                }
            })
            .catch(err => console.log(err))

        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }
    
    }, [])


    useEffect(() => {
        localStorage.setItem('ECOMMERCE_CART', JSON.stringify(cart))
    },[cart])


    console.log("cart", cart)

    const addItem = (e) => {
        axios.post(
            "/api/carts/mycart", 
            { qty: 6, productid: 10 })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))

    }


    return (
        // <div>
        // <button onClick={addItem}>Add Item</button>
        // </div>
        <div>{cart.map(item => {
            return (
                <div key={item.cartitemid}>
                    <img src={item.image} width='300px'></img>
                    <div>{item.name}</div>
                    <div>{item.description}</div>
                    <Link to={`/products?category=${item.category}`}>
                        <div>{item.category}</div>
                    </Link>
                </div>
            )
        })}</div>
    )

}

