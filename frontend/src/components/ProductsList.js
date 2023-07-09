import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';

export function ProductsList() {

    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imgOnLoad, setImgOnLoad] = useState(false);

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
  

    useEffect(() => {
        axios.get(`/api/products?page=${page}&limit=${limit}`)
        .then((res) => {
            setProducts(res.data.products);             
            setLoading(false);
            setProductsCount(res.data.count);
        })
        .catch(err => setError(true));        
    }, []);

    const getPagination = () => {
        let curPage = !page ? 1 : Number(page);
        let nextPage = null;
        let prevPage = null;
        if (curPage == null)
            curPage = 1
        if (productsCount/limit > curPage) {
            nextPage = curPage + 1;
        }
        if (curPage > 1)
            prevPage = curPage - 1;
        return (
            <div className="pagination">
            <a href={`products?page=${prevPage}&limit=${!limit ? 10 : limit}`}>
                <div className='prev-page' 
                style={{display: prevPage ? 'block' :'none'}}>Prev</div>
            </a>
            <div className='cur-page'>{curPage}</div>
            <a href={`products?page=${nextPage}&limit=${!limit ? 10 : limit}`}>
                <div className='next-page'
                style={{display: nextPage ? 'block' : 'none'}}>Next</div>
            </a>
        </div>
        )
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
            {/* <Pagination /> */}
            {getPagination()}
        </div>
        );
}

