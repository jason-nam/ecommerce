import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"


export function Product() {

    const { id } = useParams()
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

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
    }, [id]);

    // return logic
    return error?
    (    
        <div className="App">
            Product does not exist
        </div>
        )
    : (
        !loading ? (
            <div className="App">
                <img src={product.image}/>
                <div>{product.name}</div>
                <div>${product.price}</div>
                <div>{product.description}</div>
                <Link to={`/products?category=${product.category}`}>
                    <div>{product.category}</div>
                </Link>
            </div>)
        : (<p>loading</p>)
    );
}

