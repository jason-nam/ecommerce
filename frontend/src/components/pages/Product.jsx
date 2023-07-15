import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import checkIfLoggedIn from "../checkAuth"
import axios from "axios"
import Header from "../header/Header";


export function Product() {

    const { id } = useParams()
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [userId, setUserId] = useState(null);
    const [localCart, setLocalCart] = useState([]);
    const [cart, setCart] = useState([]);


    useEffect(() => {

        if ( userId < 0 || userId === null)
        {
            const data = localStorage.getItem('ECOMMERCE_CART')
            setLocalCart(JSON.parse(data ? data : "[]"))
        } 


        let isMounted = true;
        const controller = new AbortController();

        fetch("/api/products/"+id, {signal: controller.signal, method: "GET", credentials: 'include' } )
        .then((res) => {
            if (!res.ok) 
                throw new Error(res.status)
            else
                return res.json()
            })
        .then((data) => {
            if (isMounted) {
                setProduct(data[0]);             
                setLoading(false);
            }
        })
        .catch(err => setError(true));  
        
        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }
    }, [setLocalCart, id]);


    // if ( userId > 0) {
    //     localCart.forEach(item => {
    //         axios.post(
    //             "/api/carts/mycart/items/", 
    //             { qty: 3, productid: item.id })    
    //         .then(res => {
    //             console.log(res.data)
    //         })
    //         .catch(err => console.log(err))
    //     })

    //     localStorage.removeItem('ECOMMERCE_CART')
    // }

    // useEffect(() => {
    //     if ( userId < 0 || userId === null)
    //     {
    //         const data = localStorage.getItem('ECOMMERCE_CART')
    //         setLocalCart(JSON.parse(data ? data : "[]"))
    //     } 
    // },[setLocalCart])

    // useEffect(() => {
    //     localStorage.setItem('ECOMMERCE_CART', JSON.stringify(localCart))
    // },[localCart])

    const addItem = (e) => {
        e.preventDefault()
        
        if ( userId > 0) {
            axios.post(
                "/api/carts/mycart/items/", 
                { qty: 2, productid: product.id })
            .then(res => {
                console.log(res.data.item)
            })
            .catch(err => console.log(err))
        } else {
            setLocalCart(localCart.unshift({ ...product, qty: 4, }))
            localStorage.setItem('ECOMMERCE_CART', JSON.stringify(localCart)) 
        }
    }

    console.log(localCart)


    // return logic
    return (
        <div className="App">
        <Header userId={userId} setUserId={setUserId}/>
        {error?
        (    
            <div className="product-page">
                Product does not exist
            </div>
            )
        : (
            !loading ? (
                <div className="product-page">
                    <img src={product.image}/>
                    <div>{product.name}</div>
                    <div>${product.price}</div>
                    <div>{product.description}</div>
                    <Link to={`/products?category=${product.category}`}>
                        <div>{product.category}</div>
                    </Link>
                    <div>
                        <button onClick={addItem}>Add Item</button>
                    </div>

                </div>)
            : (<p>loading</p>)
        )}
        </div>
        )
}

