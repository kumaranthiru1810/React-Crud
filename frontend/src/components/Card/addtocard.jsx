import { useEffect, useState } from "react"
import Header from "../header/header"
import axios from "axios";

const Card = () => {
    const [storecarditem, setstorecarditem] = useState([]);
    const [getcarditem, setgetcarditem] = useState([]);
    useEffect(() => {
        getcard();
        getcarditems();
    }, [])
    const getcard = async () => {
        try {
            const card = await axios.get('http://localhost:8000/api/products/getcard');
            console.log(card.data);
            setstorecarditem(card.data);
        }
        catch (err) {
            console.log(err);

        }
    }
    const getcarditems = async() => {
        try {
            const res = await axios.get("http://localhost:8000/api/products/product");
            setgetcarditem(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(getcarditem);
    
    const newArray = storecarditem.map((item, index) => {
    return {
        ...item,
        ...getcarditem[index]
    };
});

console.log(newArray);

    // console.log(storecarditem.length);


    return (
        <>
            <Header />
            <div className="all-card">
                <div className="row mt-5">
                    {newArray.length > 0 ? (
                        newArray.map((product) => (
                            <div
                                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                                key={product._id || product.id}
                            >
                                <div className="card h-100 shadow-sm product-card border-0">
                                    {/* Product Image with Hover Effect */}
                                    <div className="position-relative overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="card-img-top product-image"
                                            style={{
                                                height: "200px",
                                                objectFit: "cover",
                                                transition: "transform 0.3s ease"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = "scale(1.05)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = "scale(1)";
                                            }}
                                        />

                                        {/* Stock Badge */}
                                        <div className="position-absolute top-0 end-0 m-2">
                                            <span
                                                className={`badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`}
                                            >
                                                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                            </span>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="position-absolute top-0 start-0 m-2">
                                            <span className="badge bg-primary opacity-90">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="card-body d-flex flex-column">
                                        {/* Product Name */}
                                        <h6 className="card-title fw-bold text-dark mb-2" style={{ fontSize: "16px", lineHeight: "1.3" }}>
                                            {product.name}
                                        </h6>

                                        {/* Product Description */}
                                        <p
                                            className="card-text text-muted mb-2 flex-grow-1"
                                            style={{
                                                fontSize: "13px",
                                                lineHeight: "1.4",
                                                display: "-webkit-box",
                                                WebkitLineClamp: "2",
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden"
                                            }}
                                        >
                                            {product.description}
                                        </p>

                                        {/* Price */}
                                        <div className="mb-2">
                                            <span className="h5 fw-bold text-success">₹{product.price}</span>
                                            {product.originalPrice && (
                                                <span className="text-muted text-decoration-line-through ms-2" style={{ fontSize: "14px" }}>
                                                    ₹{product.originalPrice}
                                                </span>
                                            )}
                                        </div>

                                        {/* Stock Information */}
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="text-muted">Available:</small>
                                                <div className="d-flex align-items-center">
                                                    <div
                                                        className="progress me-2"
                                                        style={{ width: "60px", height: "6px" }}
                                                    >
                                                        <div
                                                            className={`progress-bar ${product.stock > 20 ? 'bg-success' :
                                                                product.stock > 5 ? 'bg-warning' : 'bg-danger'
                                                                }`}
                                                            style={{
                                                                width: `${Math.min((product.stock / 50) * 100, 100)}%`
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <small className={`fw-bold ${product.stock > 20 ? 'text-success' :
                                                        product.stock > 5 ? 'text-warning' : 'text-danger'
                                                        }`}>
                                                        {product.stock}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <div className="empty-state">
                                <i className="bi bi-search display-1 text-muted mb-3"></i>
                                <h5 className="text-light mb-2">No Products Found</h5>
                                <p className="text-light">Try adjusting your search or filter criteria</p>
                                <button className="btn btn-primary mt-3">
                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                    Refresh Products
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}


export default Card;