import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, Link } from 'react-router-dom';
import Pagination from '../subcomponents/Pagination'
import './ProductsList.css';

export function ProductsList() {
    
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    // const [imgOnLoad, setImgOnLoad] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
          
        //get products
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
            if (isMounted) {
                setProducts(res.data.products);             
                setProductsCount(res.data.count);
                setLoading(false);
            }
        })
        .catch(err => {
            console.log(err)
            setError(true)
        });  

        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }
        
    }, [setProducts, setProductsCount, setLoading, setError, searchParams]);


    // return logic
    return <>
        {error ?    
            404
    : //(!loading ?
        <>  
            <div className="pl-title">
                {
                    !searchParams.has("search") && !searchParams.has('category') ?
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
                {!loading? <span> ({productsCount})</span> : null}
            </div>
                <div className="pl-container">{loading? 
                <div>Loading...</div>
                :
                products.length? products.map( product => {
                    return (
                        <div key={product.id} className='pl-item' id={product.id}>
                            <Link to={`/products/${product.id}`} className='item-link'>
                                <div className="pl-image-box">
                                <img src={product.image} 
                                    className="pl-image" 
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

