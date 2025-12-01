import { useEffect, useState } from "react";
import Header from "../header/header";
import axios from "axios";
import "./products.css"; // optional

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filterproducts, setfilterproducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/products/product");
            setProducts(res.data);
            setfilterproducts(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    //Search function

    const handleSearchChange = (e) => {
        const searchtext = e.target.value.toLowerCase();
        const fileteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchtext));
        setfilterproducts(fileteredProducts);
    }

    return (
        <>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                                <i className="bi bi-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="Search products by name, category, or description..."
                                onChange={handleSearchChange}
                                style={{
                                    borderLeft: 'none',
                                    padding: '12px 15px'
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 d-flex">
                        <button className="btn btn-primary col-12">+ Add</button>
                    </div>
                </div>
                <div className="row mt-5">
                    {filterproducts.length > 0 ? (
                        filterproducts.map((product) => (
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

                                        {/* Add to Cart Button */}
                                        <button
                                            className={`btn w-100 fw-bold ${product.stock > 0
                                                ? 'btn-primary'
                                                : 'btn-outline-secondary'
                                                }`}
                                            disabled={product.stock === 0}
                                            style={{
                                                transition: "all 0.3s ease",
                                                border: "none",
                                                padding: "10px"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (product.stock > 0) {
                                                    e.target.style.transform = "translateY(-2px)";
                                                    e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (product.stock > 0) {
                                                    e.target.style.transform = "translateY(0)";
                                                    e.target.style.boxShadow = "none";
                                                }
                                            }}
                                        >
                                            {product.stock > 0 ? (
                                                <>
                                                    <i className="bi bi-cart-plus me-2"></i>
                                                    Add to Cart
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-x-circle me-2"></i>
                                                    Out of Stock
                                                </>
                                            )}
                                        </button>

                                        {/* Quick Actions */}
                                        {product.stock > 0 && (
                                            <div className="d-flex justify-content-between mt-2">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    title="Add to Wishlist"
                                                >
                                                    <i class="fa-solid fa-heart"></i>
                                                </button>
                                                <button
                                                    className="btn btn-outline-info btn-sm"
                                                    title="Quick View"
                                                >
                                                    <i class="fa-solid fa-eye"></i>
                                                </button>
                                                <button
                                                    className="btn btn-outline-success btn-sm"
                                                    title="Buy Now"
                                                >
                                                    <i class="fa-solid fa-bolt-lightning"></i>
                                                </button>
                                            </div>
                                        )}
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

            {/* Add this CSS for additional styling */}
            <style jsx>{`
  .product-card {
    transition: all 0.3s ease;
    border-radius: 12px;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
  }
  
  .product-image {
    border-radius: 12px 12px 0 0;
  }
  
  .empty-state {
    max-width: 300px;
    margin: 0 auto;
  }
  
  .badge {
    font-size: 11px;
    font-weight: 500;
  }
`}</style>
        </>
    );
};

export default Products;
