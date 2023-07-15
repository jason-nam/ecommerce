import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, Link } from 'react-router-dom';
import Pagination from '../subcomponents/Pagination'

export function ProductsList() {

    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imgOnLoad, setImgOnLoad] = useState(false);

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page"),
        limit = searchParams.get("limit"),
        search = searchParams.get("search"),
        category = searchParams.get("category");


    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();
          
        axios.get(`/api/products`, 
        { 
            signal: controller.signal,
            params: { page: page, limit: limit, search: search, category: category }
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
        
    }, []);

    // return logic
    if (error) {
        return (    
            <div className="App">
            404
        </div>
        )
    } else
        return (!loading ?
            <div className="all">
                <div className="container">{products.map( product => {
                    return (
                        <div key={product.id.toString()} id={product.id}>
                            <a href={`/products/${product.id}`}>
                            <img src={product.image} 
                                className="image" 
                                width='300px'
                                />
                            <div className="name" >{product.name}</div>
                            <div className="price" >${product.price}</div>
                            <div className="desc" >{product.description}</div>
                            </a>
                            <a href={`/products?category=${product.category}`}>
                                <div className="desc" >{product.category}</div>
                            </a>
                        </div> 
                    )
                }) 
            }</div>
            <Pagination page = {page} 
                        limit = {limit} 
                        search = {search} 
                        category = {category} 
                        productsCount = {productsCount}/>
        </div> : <div>...loading</div>
        );
}

