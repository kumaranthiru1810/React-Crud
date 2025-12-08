
// import { useState } from "react";
import { useState, useEffect } from "react";
import Header from "../header/header";
import './home.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



function Home() {
    return (
        <>
            <Header />
            <Mainhome />
        </>
    )
}

function Mainhome() {
    const navigate = useNavigate();
    // const {id} = useParams();
    const [refresh, setRefresh] = useState(false);
    // const [key , setkey] = useState();

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
        else {
            getusers();
        }
    }, [refresh]);

    let [usersdata, setusersdata] = useState([]);
    // const [filterusers , setfilterusers] = useState([]);

    const getusers = async () => {
        try {
            const users = await axios.get('http://localhost:8000/api/user/');
            setusersdata(users.data);
            // console.log(users);

        }
        catch (err) {
            console.log(err);
        }
    }
    // const handleSearchChange = (e) =>{
    //     const searchtext = e.target.value.toLowerCase();
    //     const filterdata = usersdata.filter((user) =>user.name.toLowerCase().includes(searchtext));
    //     setfilterusers(filterdata);
    // }

    return (
        <div className="home">
            {/* <div className="row mt-5">
                <div className="col-md-8">
                    <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                                <i className="bi bi-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="Search name"
                                onChange={handleSearchChange}
                                style={{
                                    borderLeft: 'none',
                                    padding: '12px 15px'
                                }}
                            />
                        </div>
                </div>
                <div className="col-md-4 d-flex">
                    <button className="btn bg-white text-align-center col-12" onClick={() => { navigate('/register') }}>+ Add</button>
                </div>
            </div> */}
            <div className="mt-4">
                {usersdata.length > 0 ? (
                    usersdata.map((user, index) => (

                        <div className="card">
                            <div className="row" key={user._id || index}>
                                <div className="col-md-3">{user._id}</div>
                                <div className="col-md-3">{user.name}</div>
                                <div className="col-md-3">{user.email}</div>
                                <div className="col-md-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-success" onClick={() => navigate(`editregister/${user._id}`)}>edit</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={async () => {
                                                    // Optional: show confirm box
                                                    if (!window.confirm("Are you sure you want to delete this item?")) {
                                                        return;
                                                    }

                                                    try {
                                                        const res = await axios.delete(
                                                            `http://localhost:8000/api/user/deleteuser/${user._id}`
                                                        );

                                                        if (res.data === "success") {
                                                            // navigate('/');
                                                            setRefresh(true);
                                                            Swal.fire({
                                                                title: "Delete Successfully",
                                                                icon: "success"
                                                            })

                                                        } else {
                                                            Swal.fire({
                                                                title: "Error",
                                                                icon: "error"
                                                            });
                                                            // navigate('/');
                                                            setRefresh(false)
                                                        }
                                                    } catch (err) {
                                                        Swal.fire({
                                                            title: "Request Failed",
                                                            text: err.message,
                                                            icon: "error"
                                                        });
                                                        navigate('/');
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    ))
                ) : (
                    <div className="card">
                        No Data Found
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;
