import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';


export function ProductsList() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imgOnLoad, setImgOnLoad] = useState(false);

    const [searchParams] = useSearchParams();
  

    useEffect(() => {
        axios.get(`/api/products?page=${searchParams.get("page")}&limit=${searchParams.get("limit")}`)
        .then((res) => {
            setProducts(res.data);             
            setLoading(false);
        })
        .catch(err => setError(true));        
    }, []);

    const getPageNum = () => {
        let curPage = searchParams.get("page");
        if (curPage == null)
            curPage = 1
        return curPage
 
    }


    if (error) {
        return (    
            <div className="App">
            404
        </div>
        )
    } else
        return (
            <div className="all">
                <div className="container">{!loading ? products.map( product => {
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
                            <div className="desc" >{product.category}</div>
                            </a>
                        </div> 
                    )
                }) : (
                    <p>Loading...</p>
                )
            }</div>
            <div className="pagination">
                <div className='cur-page'>{getPageNum()}</div>
            </div>
        </div>
        );
}

