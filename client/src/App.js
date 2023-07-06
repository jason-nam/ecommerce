import logo from './logo.svg';
import './App.css';
import {Product} from './components/Product';
import {ProductsList} from './components/ProductsList';
import {User} from './components/User';
import {Login} from './components/Login';
import {Register} from './components/Register';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <Router>
    <Routes>
      {/* <Route exact path='/' element={<Home />} /> */}
      {/* <Route path='/about' element={<About />} /> */}
      <Route path='/products/:id' element={<Product />} />
      <Route path='/products' element={<ProductsList />} />
      <Route path='/users/:id' element={<User />} />
      <Route path='/login' element={<Login />} />
      {/* <Route path="*" component={NotFound}  status={404} /> */}
    </Routes>
    </Router>
  );
}



export default App;
