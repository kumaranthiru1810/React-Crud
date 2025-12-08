import './header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { User, Power } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';



function Header() {

    // const [username, setusername] = useState();

    // const userdetail = localStorage.getItem("userdetail");
    // console.log(userdetail);

    // if(userdetail){
    //     const name = axios.get(`http://localhost:8000/api/users/getoneuser/${userdetail}`)
    //     setusername(name);
    // }

    // console.log(username);

    const username = localStorage.getItem('username');


    const navigate = useNavigate();

    const handlelogout = () => {
        const toki = localStorage.removeItem("token");
        // console.log(toki);
        if (!toki) {
            Swal.fire({
                title: 'Logout Successfully',
                icon: 'success'
            })
                .then(() => { navigate('/login') })
        }
    }

    // const islogged = () => {
    //     return !!localStorage.getItem("token");
    // }

    return (
        <nav className='bg-white'>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 bg-white d-flex justify-content-center align-items-center">
                        <div><h2>CRUD</h2></div>
                    </div>
                    <div className="col-md-4 main">
                        <div>
                            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}>Home</NavLink>
                        </div>
                        <div>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}>Login</NavLink>
                        </div>
                        <div>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}>Register</NavLink>
                        </div>
                        <div>
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}>Contact</NavLink>
                        </div>
                        {/* <div>
                    <NavLink to="/products" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}>Products</NavLink>
                </div>
                <div>
                    <NavLink to="/addtocard" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}>Card</NavLink>
                </div> */}

                    </div>

                    <div className="col-md-4 d-flex justify-content-center align-items-center bg-white">

                        <div>
                            {/* <i class="fa-solid fa-power-off log-icon" ></i> */}
                            {username ? (
                                <>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <User size={18} />
                                        </div>
                                        <div className='col-md-6'>
                                            <span className="username">{username}</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Power className='log-icon' size={18} onClick={handlelogout} />
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Header;