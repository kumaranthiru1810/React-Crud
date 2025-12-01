import './header.css';
import { NavLink } from 'react-router-dom';



function Header() {
    return (
        <>
            <div className='main'>
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
                <div>
                    <NavLink to="/products" className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}>Products</NavLink>
                </div>
            </div>
        </>
    )
}

export default Header;