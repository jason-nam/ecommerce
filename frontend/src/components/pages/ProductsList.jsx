import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useSearchParams, Link, useParams } from 'react-router-dom';
import Pagination from '../subcomponents/Pagination'
import './ProductsList.css';
import { productListReducer, productListInitialState } from '../../utils/reducer'
import { urlChange } from '../../utils/util'

export function ProductsList() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ state, dispatch ] = useReducer(productListReducer, productListInitialState )
    const { products, productsCount, error, loading } = state;
    // const [imgOnLoad, setImgOnLoad] = useState(false); 
    const cateObj = useParams()
    
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        //get products by category
        if (cateObj.category) {
            let categoryUrl = `/api/products/${urlChange(cateObj.category)}`
            if (cateObj.subcategory) {
                categoryUrl += `/${urlChange(cateObj.subcategory)}`
            }
            axios.get(categoryUrl,  { 
                signal: controller.signal,
                params: { 
                    page: searchParams.get("page"), 
                    limit: searchParams.get("limit"), 
                }
            })
            .then(res => {
                if (isMounted) {
                    dispatch({ type: "PL_SUCCESS", products: res.data, count: res.data.length? res.data[0].all_count : 0})
                }
            })
            .catch( err => dispatch({ type: "PL_FAIL"}))
            
        } else {
            
            //get all products & search query
            axios.get(`/api/products`, 
            { 
                signal: controller.signal,
                params: { 
                    page: searchParams.get("page"), 
                    limit: searchParams.get("limit"), 
                    search: searchParams.get("search"), 
                    category: searchParams.get("category") 
                }
                })
            .then((res) => {
                if (isMounted)
                    dispatch({ type: "PL_SUCCESS", products: res.data.products, count: res.data.count})
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: "PL_FAIL"})
            }); 
        } 

        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }
        
    }, [searchParams]);

    return <>
        {error ?    
            404
    :
        <>  
            <div className="pl-title">
                {
                    !searchParams.has("search") && !searchParams.has('category') && !cateObj.category ?
                    <span>All Products</span> : null 
                }
                {
                    searchParams.has("search") ?
                    <span>Results for "{searchParams.get("search")}"</span>
                    : null
                }
                {
                    searchParams.has("category")?
                    <button type='button'>{searchParams.get('category')} &times;</button>
                    : null
                }
                {
                    cateObj.category? <span>{cateObj.category}</span> : null 
                }
                {
                    cateObj.subcategory? <span> / {cateObj.subcategory.replaceAll('-', ' ')}</span> : null 
                }

                {!loading? <span> ({productsCount})</span> : null}
            </div>
                <div className="pl-container">{loading? 
                <div>Loading...</div>
                :
                products.length? products.map( product => {
                    return (
                        <div key={product.id} className='pl-item' id={product.id}>
                            <Link to={`/products/product/${product.id}`} className='item-link'>
                                <div className="pl-image-box">
                                <img src={product.image} 
                                    className="pl-image" 
                                    alt={`${product.name}`}
                                    />
                                </div>
                                <div className="pl-name" >{product.name}</div>
                                <div className="pl-price" >${product.price}</div>
                            </Link>
                            <Link to={`/products?category=${product.subcategory}`}>
                                <div className="pl-category" >{product.subcategory}</div>
                            </Link>
                        </div> 
                    )
                }) 
                :
                <div>No matches for your query</div>
            }</div>
            <Pagination {...{searchParams, setSearchParams, productsCount}}/>
        </> 
        }
    </>
}