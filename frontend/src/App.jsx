import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Product } from './components/pages/Product';
import { ProductsList } from './components/pages/ProductsList';
import { User } from './components/pages/User';
import { Cart } from './components/pages/Cart';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Orders } from './components/pages/Orders';
import { Contact } from './components/pages/Contact';
import { Checkout } from './components/pages/Checkout';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ScrollOnChange  from './components/subcomponents/ScrollOnChange'
import './App.css';
import { checkoutReducer, checkoutInitialState, authReducer, authInitialState } from './utils/reducer'
import { checkIfLoggedIn } from "./utils/util"

function App() {
    const [ userId, setUserId ] = useState(null);
    const [ cart, setCart ] = useState([]);
    const mainRef = useRef(null)
    const cartRef = useRef(null)
    const headerRef = useRef(null);
    
    const [ stateCH, dispatchCH ] = useReducer(checkoutReducer, checkoutInitialState);
    const { subtotal, tax, shipping, total } = stateCH;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        loginCheck(setUserId, signal, isMounted);
        
        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }
    }, [setUserId]); 

    //subtotal
    useEffect( () => {
        dispatchCH({ type: "CALCULATE", payload: cart })
    }, [cart])
    
    //login check
    const loginCheck = useCallback((setUserId, signal, isMounted) => {
        checkIfLoggedIn(setUserId, signal, isMounted);
    }, [setUserId])
    
    //cart-right toggle
    const cartToggle = (e) => {
        e.preventDefault();
        if (cartRef.current && mainRef.current && headerRef.current) {
            cartRef.current.classList.toggle('active')
            document.body.classList.toggle('modal')

            let ah = cartRef.current.classList.contains('active')
            cartRef.current.setAttribute('aria-hidden', !ah)
            mainRef.current.setAttribute('aria-hidden', ah)
            headerRef.current.setAttribute('aria-hidden', ah)
        }
    }

    return (
        <Router>
            <Header {...{userId, cart, setCart, mainRef, cartRef, cartToggle, headerRef, subtotal}} />
            <main className="all" ref={mainRef}>
            <Routes>
                <Route exact path='/' element={<Home { ...{userId, cart, setCart} } />} />
                {/* <Route path='/about' element={<About />} /> */}
                <Route path='/products/:id' element={<Product { ...{userId, cart, setCart, cartToggle} }/>} />
                <Route path='/products' element={<ProductsList />} />
                {/* <Route path='/products/:category' element={<ProductsByCategory />} />
                <Route path='/products/:category/:subcategory' element={<ProductsBySubcategory />} /> */}
                <Route path='/users/profile' element={<User userId={userId}/>} />
                <Route path='/cart' element={<Cart {...{userId, cart, setCart, subtotal}}/>} />
                <Route path='/orders/myorders' element={<Orders {...{userId}}/>}></Route>
                <Route path="/checkout" element={<Checkout {...{userId, cart, setCart, subtotal, tax, shipping, total}} />} />
                <Route path='/contacts' element={<Contact {...{}}/>}></Route>
                <Route path='/login' element={<Login {...{userId, setUserId, setCart}} />} />
                <Route path='/register' element={<Register {...{userId, setUserId, setCart}}/>} />
                {/* <Route path="*" component={NotFound}  status={404} /> */}
            </Routes>
            </main>
            <Footer />
            <ScrollOnChange />
        </Router>
    );
}

export default App;
