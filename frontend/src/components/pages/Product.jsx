import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Header from "../header/Header";
import CartRight from "../subcomponents/CartRight";

export function Product({userId}) {

    const { id } = useParams()
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [localCart, setLocalCart] = useState([]);
    const [qty, setQty] = useState(1);
    const [inCart, setInCart] = useState(false);

    useEffect(() => {

        // get cart from localstorage
        if ( userId < 0 || userId === null)
        {
            const data = localStorage.getItem('ECOMMERCE_CART')
            setLocalCart(JSON.parse(data ? data : "[]"))
        } 

        let isMounted = true;
        const controller = new AbortController();

        // fetch product
        fetch("/api/products/"+id, {signal: controller.signal} )
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
    }, [setLocalCart, id, setProduct, setLoading]);

    // add item to cart
    const addItem = (e) => {
        e.preventDefault()
        
        //logged in => db
        if ( userId > 0) {
            axios.post(
                "/api/carts/mycart/items/", 
                { qty, productid: product.id })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
        // not logged in => localstorage
        } else {
            let lsId = localStorage.getItem('ECOMMERCE_ITEMID')
            setLocalCart(localCart.push({ ...product, 
                qty: qty, 
                cartitemid: lsId? lsId : 0 }))
            localStorage.setItem('ECOMMERCE_CART', JSON.stringify(localCart)) 
            localStorage.setItem('ECOMMERCE_ITEMID', lsId? lsId+1 : 1) 
        }
    }

    // return logic
    return (
        <>
            <Header userId={userId} />
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
                            <button onClick={() => setQty(qty+1)}>+</button>
                            <button onClick={() => qty > 1 ? setQty(qty-1) : null}>-</button>
                            <div>Quantity: {qty}</div>
                            {!inCart ? 
                                <button onClick={addItem}>Add to Cart</button>
                                : 
                                <button onClick={addItem}>Update Cart</button>
                            }
                        </div>
                    </div>)
                : (<p>loading</p>)
            )}
            <CartRight userId={userId}/>
        </>
    )
}

