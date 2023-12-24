import { Link } from "react-router-dom"

export default function ProductCards ({products}) {

    return products.length? 
    <div className="pl-container">{products.map( product => {
        return (
            <div key={product.id} className='pl-item' id={product.id}>
                <Link to={`/products/product/${product.id}`} className='item-link'>
                    <div className="pl-image-box">
                    <img src={product.image.split(', ')[0]} 
                        className="pl-image" 
                        alt={`${product.name}`}
                        loading="lazy"
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
    })}</div>
    :
    <div className="no-product">No matches</div>

}