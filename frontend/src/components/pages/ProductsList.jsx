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

    const [searchParams] = useSearchParams();

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
    : (!loading ?
        <>
                <div className="pl-container">{products.map( product => {
                    return (
                        <div key={product.id} className='pl-item' id={product.id}>
                            <a href={`/products/${product.id}`}>
                                <img src={product.image} 
                                    className="pl-image" 
                                    />
                                <div className="pl-name" >{product.name}</div>
                                <div className="pl-price" >${product.price}</div>
                            </a>
                            <a href={`/products?category=${product.category}`}>
                                <div className="pl-category" >{product.category}</div>
                            </a>
                        </div> 
                    )
                }) 
            }</div>
            <Pagination {...{searchParams, productsCount}}/>
        </> : <div>...loading</div>
        )
        }
    </>
}

