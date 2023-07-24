import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Header from "../header/Header";
import CartRight from "../subcomponents/CartRight";
import './Product.css'

export function Product({userId, cart, setCart}) {

    const { id } = useParams()
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [qty, setQty] = useState(1);

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        // fetch product
        fetch(`/api/products/${id}`, {signal: controller.signal} )
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
    }, [setCart, id, setProduct, setLoading]);

    // add item to cart
    const addItem = (e) => {
        e.preventDefault()
        let inCart = cart.filter(x => x.id == product.id)
        //logged in
        if ( userId > 0) {
            //already in cart => change qty
            if (inCart.length){
                axios.put(`/api/carts/mycart/items/${inCart[0].cartitemid}`,
                { 
                    qty: inCart[0].qty+qty, 
                    productid:inCart[0].id, 
                    cartid:inCart[0].cartid
                })
                .then(res => {
                    setCart(cart.splice(0).map(x=> {
                    if (x.cartitemid===inCart[0].cartitemid)
                        x['qty']=x.qty+qty;
                    return x;
                }))
                })
                .catch(err => console.log(err))
            // not in cart => new cartitem
            } else {
                axios.post(
                    "/api/carts/mycart/items/", 
                    { qty, productid: product.id })
                .then(res => {
                    let cartitem = {...product, 
                        cartitemid:res.data.item.id,
                        cartid: res.data.item.cartid,
                        qty
                    }
                    setCart([...cart, cartitem])
                })
                .catch(err => console.log(err))
            }
        // not logged in => localstorage
        } else {
            if (inCart.length){
                let lcCart = cart.splice(0).map(x=> {
                    if (x.cartitemid===inCart[0].cartitemid)
                        x['qty']=x.qty+qty;
                    return x;
                })
                localStorage.setItem('ECOMMERCE_CART', JSON.stringify(lcCart)) 
                setCart(lcCart)
            } else {
                let lsId = localStorage.getItem('ECOMMERCE_ITEMID')
                let lcCart = [...cart, { ...product, 
                    qty, 
                    cartitemid: lsId? lsId : 0 }]
                localStorage.setItem('ECOMMERCE_CART', JSON.stringify(lcCart)) 
                localStorage.setItem('ECOMMERCE_ITEMID', lsId? lsId+1 : 1)     
                setCart(lcCart)
            }
        }
        setTimeout(() => document.querySelector('.cart-r')? 
        document.querySelector('.cart-r').classList.add('active'): null, 500)
    }

    // return logic
    return (
        <>
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
                        <div className="product-info">
                            <Link to={`/products?category=${product.category}`}>
                                <div className="category">{product.category}</div>
                            </Link>
                            <div className="name">{product.name}</div>
                            <div className="description">{product.description}</div>
                            <div className="price">${product.price}</div>
                            <div className="qty">
                                <button onClick={() => qty > 1 ? setQty(qty-1) : null}>-</button>
                                <div>{qty}</div>
                                <button onClick={() => setQty(qty+1)}>+</button>
                            </div>
                            <button className='add-to-cart' onClick={addItem}>Add to Cart</button>
                        </div>
                    </div>)
                : (<p>loading</p>)
            )}
            <CartRight { ...{userId, cart, setCart} } />
        </>
    )
}

