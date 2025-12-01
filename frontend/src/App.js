import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/home/home';
import Contact from './components/contact/contact';
import Edit from './components/register/edit-register';
import Products from './components/products/products';




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
          <Route path='/products' element = {<Products />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
