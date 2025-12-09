import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../header/header';
import './contact.css'
import { useNavigate } from 'react-router-dom';


const Contact = () => {
    return (
        <>
            <Header />
            <Contactmain />
        </>
    )
}

const Contactmain = () => {

    let [firstname, setfirstname] = useState();
    let [lastname, setlastname] = useState();
    let [email, setemail] = useState();
    let [phone, setphone] = useState();
    let [details, setdetails] = useState();

    const navigate = useNavigate();

    useEffect(() => {

        const key = localStorage.getItem("token");
        if (!key) {
            // return;
            Swal.fire({
                title: 'Plese Login',
                icon: 'warning'
            })
                .then(() => { navigate('/login') });
        }
    })

    const HandleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/contact/contact', { firstname, lastname, email, phone, details })
            .then(contact => {
                if (contact.data === 'request') {
                    Swal.fire({
                        title: 'Error',
                        text: 'Require All Fields',
                        icon: 'error'
                    })
                    navigate('/contact');
                }
                else {
                    Swal.fire({
                        title: 'Submitted Successfully',
                        icon: 'success'
                    })
                    navigate('/');
                }
            })
            .catch(err => console.log(err)
            )
    }

    return (
        <div className="container">
            <div className="card mt-5">
                <form onSubmit={HandleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-6 mt-5">
                            <label htmlFor="firstname">Firstname</label>
                            <input
                                type='text'
                                name='firstname'
                                placeholder='Firstname'
                                className='form-control'
                                onChange={(e) => { setfirstname(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="col-12 col-md-6 mt-5">
                            <label htmlFor="lastname">Lastname</label>
                            <input
                                type='text'
                                name='lastname'
                                placeholder='Lastname'
                                className='form-control'
                                onChange={(event) => { setlastname(event.target.value) }}
                                required
                            />
                        </div>
                        <div className="col-12 mt-5">
                            <label htmlFor="email">Email</label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Enter Email'
                                className='form-control'
                                onChange={(e) => { setemail(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="col-12 mt-5">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type='number'
                                name='phone'
                                placeholder='Enter Number'
                                className='form-control'
                                onChange={(e) => { setphone(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="col-12 mt-5">
                            <label htmlFor="details">Details</label>
                            <textarea rows={4} placeholder='Enter Details' name='details' className='form-control' onChange={(e) => setdetails(e.target.value)}></textarea>
                        </div>
                        <div className="col-12 mt-5">
                            <input type="submit" value="Submit" className='btn btn-primary' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact;