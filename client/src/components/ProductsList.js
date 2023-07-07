import React, { useState, useEffect } from "react";

export function ProductsList() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imgOnLoad, setImgOnLoad] = useState(false);

    useEffect(() => {
        fetch("/products")
        .then((res) => {
            if (!res.ok) 
                throw new Error(res.status)
            else
                return res.json()
            })
        .then((data) => {
            setProducts(data);             
            setLoading(false);
            
        })
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
            <div className="container">{!loading ? products.map( product => {
                return (
                    <div key={product.id} id={product.id}>
                        <img src={product.image} 
                            className="image" 
                            width='300px'
                            />
                        <div className="name">{product.name}</div>
                        <div className="price">${product.price}</div>
                        <div className="desc">{product.description}</div>
                        <div className="desc">{product.category}</div>
                    </div> 
                )
            }) : (
                <p>Loading...</p>
            )
        }</div>
        );
}

