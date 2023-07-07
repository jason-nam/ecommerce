import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

export function Product() {

    const { id } = useParams()
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products/"+id)
        .then((res) => {
            if (!res.ok) 
                throw new Error(res.status)
            else
                return res.json()
            })
        .then((data) => {
            setProduct(data[0]);             
            setLoading(false);
        })
        .catch(err => setError(true));        
    }, [id]);

    if (error) {
        return (    
            <div className="App">
            Product does not exist
        </div>
        )
    } else
        return (
            !loading ? (
                <div className="App">
                    <img src={product.image}/>
                    <div>{product.name}</div>
                    <div>${product.price}</div>
                    <div>{product.description}</div>
                    <div>{product.category}</div>
                </div>)
            : (<p>loading</p>)
        );
}

