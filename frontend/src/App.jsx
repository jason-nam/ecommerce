import './App.css';
import {Home} from './components/pages/Home';
import {Product} from './components/pages/Product';
import {ProductsList} from './components/pages/ProductsList';
import {User} from './components/pages/User';
import {Cart} from './components/pages/Cart';
import {Login} from './components/pages/Login';
import {Register} from './components/pages/Register';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                {/* <Route path='/about' element={<About />} /> */}
                <Route path='/products/:id' element={<Product />} />
                <Route path='/products' element={<ProductsList />} />
                <Route path='/users/profile' element={<User />} />
                <Route path='/carts/mycart' element={<Cart />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {/* <Route path="*" component={NotFound}  status={404} /> */}
            </Routes>
        </Router>
    );
}

export default App;
