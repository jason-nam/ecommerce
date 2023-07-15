import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import Header from "../header/Header";


// const localCart = JSON.parse(localStorage.getItem('ECOMMERCE_CART')? localStorage.getItem('ECOMMERCE_CART') : "[]")
// const localCart = [{id: 1, qty: 3, productid: 1, cartid: 1}]

export function Cart() {
    const [localCart, setLocalCart] = useState([]);
    const [cart, setCart] = useState([]);
    const [userId, setUserId] = useState(null);

    // useEffect(() => {
    //     localStorage.setItem('ECOMMERCE_CART', JSON.stringify(localCart))
    // },[localCart])

    useEffect(() => {
        if (userId > 0) {
            let isMounted = true;

            // localCart.forEach(item => {
            //     axios.post(
            //         "/api/carts/mycart/items/", 
            //         { qty: 3, productid: item.id })    
            //     .then(res => {
            //         console.log(res.data)
            //     })
            //     .catch(err => console.log(err))
            // })
            // setLocalCart([])
            // localStorage.removeItem('ECOMMERCE_CART')

            axios.post(
                "/api/carts/mycart/items", 
                { items: localCart })
                .then(res => {
                    console.log(res.data)
                    setLocalCart([])
                    localStorage.removeItem('ECOMMERCE_CART')
                })
                .catch(err => console.log(err))
            setLocalCart([])
    

            const controller = new AbortController();
            const signal = controller.signal;
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
            const data = localStorage.getItem('ECOMMERCE_CART')
            setLocalCart(JSON.parse(data ? data : "[]"))
            setCart(JSON.parse(data ? data : "[]"))
        } 

    
    }, [setCart, setLocalCart, userId])


    console.log("cart", cart)


    return (
        <div>
        <Header userId={userId} setUserId={setUserId}/>
        <div>
            {cart.map(item => {
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
        </div>
    )

}

