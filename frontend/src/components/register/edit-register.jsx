import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/header";
import Swal from 'sweetalert2';

const Edit = () => {
    return (
        <>
            <Header />
            <Editregister />
        </>
    );
};

const Editregister = () => {

    const navigate = useNavigate();

    // ------------------ FIXED STATES ------------------
    const [getdata, setgetdata] = useState({});
    const [editname, seteditname] = useState("");
    const [editemail, seteditemail] = useState("");
    const [editpassword, seteditpassword] = useState("");

    const { id } = useParams();

    // ------------------ GET USER DETAILS ------------------
    useEffect(() => {
        getuserdetails();
    }, []);

    const getuserdetails = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/user/users/${id}`);
            console.log(res.data);
            setgetdata(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // ------------------ SET DATA INTO INPUT FIELDS ------------------
    useEffect(() => {
        if (getdata) {
            seteditname(getdata.name || "");
            seteditemail(getdata.email || "");
            seteditpassword(getdata.password || "");
        }
    }, [getdata]);

    // ------------------ UPDATE SUBMIT ------------------
    const HandleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:8000/api/user/edituser/${id}`, {
            name: editname,
            email: editemail,
            password: editpassword
        })
        .then(res => {
            if (res.data === 'success') {
                Swal.fire({
                    title: "Updated Successfully",
                    icon: 'success'
                });
                navigate('/')
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error'
                }); 
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <div className="home mt-5">
                <div className="card">

                    <form id="register-form" onSubmit={HandleSubmit}>

                        <div className="mt-5">
                            <label htmlFor="usname">UserName</label>
                            <input
                                type="text"
                                id="usname"
                                className="form-control"
                                placeholder="Enter Name"
                                value={editname}
                                onChange={(e) => seteditname(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-5">
                            <label htmlFor="usemail">Email</label>
                            <input
                                type="email"
                                id="usemail"
                                className="form-control"
                                placeholder="Enter Email"
                                value={editemail}
                                onChange={(e) => seteditemail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-5">
                            <label htmlFor="uspass">Password</label>
                            <input
                                type="password"
                                id="uspass"
                                className="form-control"
                                placeholder="Enter Password"
                                value={editpassword}
                                onChange={(e) => seteditpassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-5 col-md-6">
                            <input type="submit" value="Update" className="btn btn-primary" />
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default Edit;
