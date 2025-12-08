import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/home/home';
import Contact from './components/contact/contact';
import Edit from './components/register/edit-register';
import Products from './components/products/products';
// import Card from './components/Card/addtocard';
// import Maincard from './components/Card/addtocard';
import Card from './components/Card/addtocard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/editregister/:id' element={<Edit />} />
          {/* <Route path='/products' element = {<Products />} /> */}
          {/* <Route path='/addtocard' element = {<Card />} /> */}
          {/* <Route path='/logout' element = {<Card />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
