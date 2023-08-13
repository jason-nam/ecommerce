import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    return (
        <CartContext.Provider value={{cart, setCart}}>
            {props.children}
        </CartContext.Provider>
    );
};

/* 
Use it with:

App.jsx

    <Router>
        <CartProvider>
            <Header />
            <div>
            <Routes>
            ...
            </Routes>
            </div>
        </CartProvider>
    </Router>



    
SomeComponent.jsx:

import { CartContext } from "../../utils/CartProvider"
import { useContext } from "react";

export default function SomeComponent () {
    ...
    const {cart, setCart} = useContext(CartContext)
    ...
}

*/