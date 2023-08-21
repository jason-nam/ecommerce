import React, { useState, useEffect, useReducer } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import './Product.css'
import './ProductsList.css';
import ProductCards from '../subcomponents/ProductCards'
import { productReducer, productInitialState } from '../../utils/reducer'
import { urlChange } from '../../utils/util'
import { sample } from 'underscore'

export function Product({userId, cart, setCart, cartToggle, addedToast}) {

    const { id } = useParams()
    const [ state, dispatch ] = useReducer(productReducer,productInitialState )
    const { product, error, loading, rec_products, rec_error, rec_loading } = state;
    const [ qty, setQty ] = useState(1);

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        // fetch product
        fetch(`/api/products/product/${id}`, {signal: controller.signal} )
        .then((res) => {
            if (!res.ok) 
                throw new Error(res.status)
            else
                return res.json()
            })
        .then((data) => {
            if (isMounted) {
                dispatch( { type: 'PRODUCT_SUCCESS', payload: data[0] } )
                axios.get(`/api/products/${urlChange(data[0].category)}/${urlChange(data[0].subcategory)}`)
                .then(res => {dispatch({ type: 'REC_PRODUCTS', payload:sample(res.data, 4) })})
                .catch(err => console.log(err))
            }
        })
        .catch(err => dispatch({type: 'PRODUCT_FAIL'}));  
        
        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }
    }, [setCart, id]);

    // add item to cart
    const addItem = (e) => {
        e.preventDefault()
        let inCart = cart.filter(x => x.id == product.id)
        //logged in
        if ( userId > 0) {
            //already in cart => change qty
            if (inCart.length){
                axios.put(`/api/carts/items/${inCart[0].cartitemid}`,
                { 
                    qty: inCart[0].qty + qty, 
                    productid: inCart[0].id, 
                    cartid: inCart[0].cartid,
                })
                .then(res => {
                    setCart(cart.splice(0).map(x=> {
                    if (x.cartitemid===inCart[0].cartitemid)
                        x['qty']=x.qty+qty;
                    return x;
                    }))
                    addedToast(`Added to cart`)
                })
                .catch(err => console.log(err))
            // not in cart => new cartitem
            } else {
                axios.post(
                    "/api/carts/items/", 
                    { qty, productid: product.id })
                .then(res => {
                    let cartitem = {...product, 
                        cartitemid:res.data.item.id,
                        cartid: res.data.item.cartid,
                        qty
                    }
                    setCart([...cart, cartitem])
                    addedToast(`Added to cart`)
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
            addedToast(`Added to cart`)
        }
        cartToggle(e);
    }

    // return logic
    return (
        <>
        <div className="product">
            <div className="product-container">
            {error?
                (    
                    <div className="error">
                        Product does not exist.
                    </div>
                    )
                : (
                    !loading ? (
                        <> 
                            <div className="pi-left">
                                <div className="pi-left-links">
                                    {/* <span className="go-back" onClick={() => navigate(-1)}>Back</span> */}
                                    <Link to={`/products/${urlChange(product.category)}`}>
                                        <span className="pi-category">{product.category}</span>
                                    </Link>
                                    <span> &gt; </span>
                                    <Link to={`/products/${urlChange(product.category)}/${urlChange(product.subcategory)}`}>
                                        <span className="pi-category">{product.subcategory}</span>
                                    </Link>
                                </div>
                                <img className="product-image" src={product.image} alt={`${product.name}`}/>
                            </div>
                            <div className="pi-right">
                                <div className="product-info">
                                    <div className="pi-name">{product.name}</div>
                                    <div className="pi-price">${product.price}</div>
                                    <div className="pi-qty">
                                        <div id="pi-qty-var">Quantity </div>
                                        <div className="pi-qty-bt">
                                            <button className="qty-change" onClick={() => qty > 1 ? setQty(qty-1) : null}>-</button>
                                            <div className="qty-num">{qty}</div>
                                            <button className="qty-change" onClick={() => setQty(qty+1)}>+</button>
                                        </div>
                                    </div>
                                    <button className='add-to-cart' onClick={addItem}>Add to Cart</button>
                                    <div className="pi-desc-title">Product Description</div>
                                    <div className="pi-desc">{product.description}</div>
                                </div>
                            </div>
                        </>)
                    : (<p>loading</p>)
                )}
            </div>
            <div className="recs">You May Also Like</div>
            <div className="product-carousel">
                <ProductCards products={rec_products} />
            </div>
        </div>
        
        </>
    )
}

