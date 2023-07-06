import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

export function ProductsList() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("/products")
        .then((res) => {
            if (!res.ok) 
                throw new Error(res.status)
            else
                return res.json()
            })
        .then((data) => setProducts(data))
        .catch(err => setError(true));        
    }, []);

    if (error) {
        return (    
            <div className="App">
            404
        </div>
        )
    } else
        return (
            <div className="container">{products.map( product => {
                return (
                    <div key={product.id} id={product.id}>
                        <div className="name">{product.name}</div>
                        <div className="price">${product.price}</div>
                        <div className="desc">{product.description}</div>
                    </div> 
                )
            })}</div>
        );
}

