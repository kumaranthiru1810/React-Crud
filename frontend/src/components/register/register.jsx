import { useState } from "react";
import Header from "../header/header";
import './register.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate} from 'react-router-dom';

function Register() {
    return (
        <>
            <Header />
            <Registerold />
        </>
    )
}

function Registerold() {

    let [name, setname] = useState();
    let [email, setemail] = useState();
    let [password, setpassword] = useState();
    const navigate = useNavigate();

    const handleSubmit =(event)=>{
        event.preventDefault();

        axios.post( 'http://localhost:8000/api/user/register', {name,email,password})
            .then(result =>{
                if(result.data === 'Already register'){
                    // alert('already register');
                    Swal.fire({
                        title:'Already Exist',
                        text:'Plece enter another mail',
                        icon:'error'
                    }); 
                    navigate('/register');
                }
                else{
                    // alert('Registered Successfully');
                    // console.log(result.data);

                    localStorage.setItem('username',name);
                    
                    Swal.fire({
                        title:'Register Successfully',
                        text:'Welcome Back , '+ name,
                        icon:'success'
                    });
                    navigate('/login')
                }
            })
            .catch(err=>console.log(err));
    }

    return (
        <div className="container">
            <div className="home mt-5">
                <div className="card">
                    <form id="register-form" onSubmit={handleSubmit}>
                        <div className="mt-5">
                            <label htmlFor="usname">UserName</label>
                            <input type="text" name="name" id="usname" className="form-control" placeholder="Enter a Name" onChange={(event) => {setname(event.target.value)}} />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="usemail">Email</label>
                            <input
                                type="email"
                                id="usemail"
                                name="email"
                                className="form-control"
                                onChange={(event) =>{setemail(event.target.value)}}
                                placeholder="Enter a Email" />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="uspass">Password</label>
                            <input type="password" name="password" id="uspass" className="form-control" placeholder="Enter a Password" onChange={(event) =>{setpassword(event.target.value)}} />
                        </div>
                        <div className="row">
                            <div className="mt-5 col-md-6">
                                <input type="submit" value="Submit" className="btn btn-primary" />
                            </div>
                            <div className="col-md-6 mt-5">
                                <p className="text-black">Already have an account? <a href="/login">Login</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;