import { useState } from "react";
import Header from "../header/header";
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function Login() {
    return (
        <>
            <Header />
            <Loginold />
        </>
    )
}

function Loginold() {

    let [email, setemail] = useState();
    let [password, setpassword] = useState();
    const navigate = useNavigate();

    const HandleSubmit = (e)=>{
        e.preventDefault();

        axios.post('http://localhost:8000/api/user/login',{email,password})
        .then(result=>{
            if(result.data.message === 'success'){
                // console.log(result.data.token);
                // console.log(result.data.data);
                

                JSON.stringify(localStorage.setItem('token',result.data.token));
                // JSON.stringify(localStorage.setItem('userdetail',result.data.data.email));
                
                Swal.fire({
                    title:'Login Successfully',
                    text:'Go To Home',
                    icon:'success'
                });
                
                navigate('/');
            }
            else if(result.data.message === 'worng password'){
                Swal.fire({
                    title:'Incorrect Password',
                    text:'Plece Enter Correct Password',
                    icon:'error'
                });
                navigate('/login');
            }
            else{
                Swal.fire({
                    title:'First Registered',
                    text:'Go To register bage',
                    icon:'error',
                    timer:2000
                });
                navigate('/login');
            }

            })
            .catch(err => console.log(err));
    }

    return (
        <div className="full">
            <div className="container">
                <div className="home mt-5">
                    <div className="card">
                        <form className="login-form" onSubmit={HandleSubmit}>
                            <div className="mt-5">
                                <label htmlFor="usemail">Email</label>
                                <input
                                    type="email"
                                    id="usemail"
                                    name="email"
                                    className="form-control"
                                    onChange={(event) => { setemail(event.target.value) }}
                                    placeholder="Enter a Email" />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="uspass">Password</label>
                                <input type="password" name="password" id="uspass" className="form-control" onChange={(event) => { setpassword(event.target.value) }} placeholder="Enter a Password" />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mt-5">
                                    <button
                                        type="submit"
                                        className="auth-button btn btn-primary"
                                    >
                                        Login
                                    </button>
                                </div>
                                <div className="col-md-6 mt-5" style={{ textAlign: 'center' }}>
                                    <p>Don't have an account? <a href="/register">Register</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;