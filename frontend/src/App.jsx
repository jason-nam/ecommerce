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
import { GuestOrder } from './components/pages/GuestOrder';
import { Contact } from './components/pages/Contact';
import { Checkout } from './components/pages/Checkout';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ScrollOnChange  from './components/subcomponents/ScrollOnChange'
import './App.css';
import { checkoutReducer, checkoutInitialState } from './utils/reducer'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [ userId, setUserId ] = useState(null);
    const [ cart, setCart ] = useState([]);
    const [ cartLoading, setCartLoading ] = useState(true);
    const mainRef = useRef(null)
    const cartRef = useRef(null)
    const headerRef = useRef(null);
    
    const [ stateCH, dispatchCH ] = useReducer(checkoutReducer, checkoutInitialState);
    const { subtotal } = stateCH;

    const addedToast = (str) => toast(str);
    const authToast = (str) => toast.success(str);
    const orderToast = (str) => toast.success(str);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        axios.get("/api/checkAuth", {signal: signal})
        .then((res) => {
            if (isMounted) {
                if (res.data.loggedIn) {
                    setUserId(res.data.user.id)
                } else {
                    setUserId(-1)
                }
            }
        })
        .catch(err => console.log(err.response, "Session Error"));     
        
        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }
    }, [setUserId]); 

    //subtotal
    useEffect(() => {
        dispatchCH({ type: "CALCULATE", payload: cart })
    }, [cart])
        
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
            <ToastContainer position="bottom-left" hideProgressBar autoClose={1500}/>
            <main className="all" ref={mainRef}>
            <Routes>
                <Route exact path='/' element={<Home { ...{userId, cart, setCart} } />} />
                {/* <Route path='/about' element={<About />} /> */}
                <Route path='/products/product/:id' element={<Product { ...{userId, cart, setCart, cartToggle, addedToast} }/>} />
                <Route path='/products' element={<ProductsList />} />
                <Route path='/products/:category' element={<ProductsList />} />
                <Route path='/products/:category/:subcategory' element={<ProductsList />} />
                <Route path='/users/profile' element={<User userId={userId}/>} />
                <Route path='/cart' element={<Cart {...{userId, cart, setCart, subtotal}}/>} />
                <Route path='/orders' element={<Orders {...{userId}}/>}></Route>
                <Route path='/guest-order' element={<GuestOrder {...{userId}}/>}></Route>
                <Route path="/checkout" element={<Checkout {...{userId, cart, setCart, subtotal, stateCH, orderToast, dispatchCH}} />} />
                <Route path='/contacts' element={<Contact {...{}}/>}></Route>
                <Route path='/login' element={<Login {...{userId, setUserId, setCart, authToast}} />} />
                <Route path='/register' element={<Register {...{userId, setUserId, setCart, authToast}}/>} />
                {/* <Route path="*" component={NotFound}  status={404} /> */}
            </Routes>
            </main>
            <Footer />
            <ScrollOnChange />
        </Router>
    );
}

export default App;
