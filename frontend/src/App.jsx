import './App.css';
import React, { useState, useEffect } from "react";
import {Home} from './components/pages/Home';
import {Product} from './components/pages/Product';
import {ProductsList} from './components/pages/ProductsList';
import {User} from './components/pages/User';
import {Cart} from './components/pages/Cart';
import {Login} from './components/pages/Login';
import {Register} from './components/pages/Register';
import checkIfLoggedIn from "./checkAuth"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import  ScrollOnChange  from './components/subcomponents/ScrollOnChange'

function App() {
    const [userId, setUserId] = useState(null);
    const [cart, setCart] = useState([]);

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


    return (
        <Router>
            <Header {...{userId, cart, setCart}} />
            <div className="all">
            <Routes>
                <Route exact path='/' element={<Home { ...{userId, cart, setCart} } />} />
                {/* <Route path='/about' element={<About />} /> */}
                <Route path='/products/:id' element={<Product { ...{userId, cart, setCart} }/>} />
                <Route path='/products' element={<ProductsList />} />
                <Route path='/users/profile' element={<User userId={userId}/>} />
                <Route path='/carts/mycart' element={<Cart {...{userId, cart, setCart}}/>} />
                <Route path='/login' element={<Login userId={userId} setUserId={setUserId}/>} />
                <Route path='/register' element={<Register userId={userId}/>} />
                {/* <Route path="*" component={NotFound}  status={404} /> */}
            </Routes>
            </div>
            <Footer />
            <ScrollOnChange />
        </Router>
    );
}

export default App;
