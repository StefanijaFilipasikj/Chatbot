import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./Products.css";

const ProductDetails = ({ getProduct, product, onAddToCart }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, updateFormData] = useState({quantity: 1,})
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        getProduct(id);
    }, [id, getProduct]);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const quantity = formData.quantity;
        onAddToCart(product.id, quantity, navigate)
    }

    const handleShowImage = () => {
        setShowImage(true);
    };

    const handleCloseImage = () => {
        setShowImage(false);
    };

    return (
        <div className="m-0 bg-light min-vh-100 product-details">
            <div className="row d-flex m-5">
                <div className="col-4">
                    <div className="card details p-5 rounded-0 border-0 mx-1 mb-4">
                        <div
                            className="card-img-top p-5 pt-3"
                            style={{
                                backgroundImage: `url(${product.imageUrl})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                height: '500px'
                            }}
                            onClick={handleShowImage}
                        ></div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card details p-5 rounded-0 border-0 mx-1 mb-4 bg-lightblue">
                        <h2 className="m-0">{product.title}</h2>
                        <hr/>
                        <h5 className="m-0">WARRANTY: {product.warranty}</h5>
                        <hr/>
                        <div className="m-0">
                            {/*<h5>DESCRIPTION:</h5>*/}
                            <table className="table descriptions-container">
                                <tbody>
                                {product.descriptions && product.descriptions.map((d) => {
                                    return (
                                        <tr key={d.key}>
                                            <td className="fw-bold w-50">{d.key}</td>
                                            <td className="ps-4">
                                                {d.value === "TRUE" ? (
                                                    <span className="fa fa-check text-success"></span>
                                                ) : (
                                                    <span>{d.value}</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card details p-5 rounded-0 border-0 mx-1 mb-4">
                        <div className="d-flex justify-content-between alert rounded-0 border-0 mb-0 pb-0">
                            <h4 className="m-0 align-self-center">REGULAR PRICE</h4>
                            <h2 className="m-0 align-self-center">{product.regularPrice}$</h2>
                        </div>
                        {product.happyPrice !== 0 && (
                            <>
                                <hr/>
                                <div className="d-flex justify-content-between alert alert-warning rounded-0 border-0 text-warning">
                                    <h4 className="m-0 align-self-center">HAPPY PRICE</h4>
                                    <h2 className="m-0 align-self-center">{product.happyPrice}$</h2>
                                </div>
                            </>
                        )}
                        <br/>
                        <form className="d-flex" onSubmit={onFormSubmit}>
                            <input className="form-control w-50 rounded-0" type="number" min={1} name="quantity" onChange={handleChange}/>
                            <button className="btn btn-info w-50 rounded-0 fs-5" type="submit"><span className={"fa fa-shopping-cart"}></span> Add To Cart</button>
                        </form>
                    </div>
                </div>
            </div>

            {showImage && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <span className="close-btn text-primary" onClick={handleCloseImage}>×</span>
                        <div
                            style={{
                                backgroundImage: `url(${product.imageUrl})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                height: '600px'
                            }}
                        ></div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductDetails;