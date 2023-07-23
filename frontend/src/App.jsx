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

function App() {
    const [userId, setUserId] = useState(null);

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
            <Routes>
                <Route exact path='/' element={<Home userId={userId}/>} />
                {/* <Route path='/about' element={<About />} /> */}
                <Route path='/products/:id' element={<Product userId={userId}/>} />
                <Route path='/products' element={<ProductsList userId={userId}/>} />
                <Route path='/users/profile' element={<User userId={userId}/>} />
                <Route path='/carts/mycart' element={<Cart userId={userId}/>} />
                <Route path='/login' element={<Login userId={userId} setUserId={setUserId}/>} />
                <Route path='/register' element={<Register userId={userId}/>} />
                {/* <Route path="*" component={NotFound}  status={404} /> */}
            </Routes>
        </Router>
    );
}

export default App;
