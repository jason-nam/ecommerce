import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"


export function Product() {

    const { id } = useParams()

    const [product, setProduct] = useState("");
    useEffect(() => {
        fetch("http://localhost:4000/products/"+id)
        .then((res) => res.json())
        .then((data) => setProduct(data[0]));
    }, []);

  return (
    <div className="App">
      <div>{product.name}</div>
      <div>${product.price}</div>
      <div>{product.description}</div>
    </div>
  );
}

