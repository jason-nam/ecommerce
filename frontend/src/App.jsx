import './App.css';
import React, { useState, useEffect, useRef } from "react";
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

import { checkIfLoggedIn } from "./utils/util"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ScrollOnChange  from './components/subcomponents/ScrollOnChange'

function App() {
    const [ userId, setUserId ] = useState(null);
    const [ cart, setCart ] = useState([]);
    const [ auth, setAuth ] = useState(false)
    const mainRef = useRef(null)
    const cartRef = useRef(null)
    const headerRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        checkIfLoggedIn(setUserId, signal, isMounted);
        
        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }
    }, [setUserId]); 
    
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
            <Header {...{userId, cart, setCart, mainRef, cartRef, cartToggle, headerRef}} />
            <main className="all" ref={mainRef}>
            <Routes>
                <Route exact path='/' element={<Home { ...{userId, cart, setCart} } />} />
                {/* <Route path='/about' element={<About />} /> */}
                <Route path='/products/:id' element={<Product { ...{userId, cart, setCart, cartToggle, mainRef, headerRef} }/>} />
                <Route path='/products' element={<ProductsList />} />
                <Route path='/users/profile' element={<User userId={userId}/>} />
                <Route path='/cart' element={<Cart {...{userId, cart, setCart}}/>} />
                <Route path='/orders/myorders' element={<Orders {...{userId}}/>}></Route>
                <Route path="/checkout" element={<Checkout {...{userId, cart, setCart}} />} />
                <Route path='/contacts' element={<Contact {...{}}/>}></Route>
                <Route path='/login' element={<Login {...{userId, setUserId, setCart, auth, setAuth}} />} />
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
