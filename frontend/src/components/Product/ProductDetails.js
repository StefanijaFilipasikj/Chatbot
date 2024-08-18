import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./Products.css";

const ProductDetails = ({ getProduct, product, onAddToCart }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getProduct(id);
    }, [id, getProduct]);

    const [formData, updateFormData] = React.useState({
        quantity: 1,
    })

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

    return (
        <div className="m-0 bg-light min-vh-100">
            <div className="row d-flex m-5">
                <div className="col-4">
                    <div className="card details p-5 rounded-0 border-0 mx-1 mb-4">
                        <img src={product.imageUrl} alt={"img"}/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card details p-5 rounded-0 border-0 mx-1 mb-4 bg-lightblue">
                        <h2 className="m-0">{product.title}</h2>
                        <hr/>
                        <h5 className="m-0">WARRANTY: {product.warranty}</h5>
                        <hr/>
                        <div className="m-0">
                            <h5>DESCRIPTION:</h5>
                            {product.descriptions && product.descriptions.map((d) => {
                                return(
                                    <p className="my-2 fs-5"> {d.key} {d.value}</p>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card details p-5 rounded-0 border-0 mx-1 mb-4">
                        <div className="d-flex justify-content-between">
                            <h4 className="m-0 align-self-center">REGULAR PRICE:</h4>
                            <h2 className="m-0 align-self-center">{product.regularPrice}</h2>
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between">
                            <h4 className="m-0 align-self-center">HAPPY PRICE:</h4>
                            <h2 className="m-0 align-self-center">{product.happyPrice}</h2>
                        </div>
                        <br/>
                        <form className="d-flex" onSubmit={onFormSubmit}>
                            <input className="form-control w-50 rounded-0" type="number" min={1} name="quantity" onChange={handleChange}/>
                            <button className="btn btn-info w-50 rounded-0 fs-5" type="submit"><span className={"fa fa-shopping-cart"}></span> Add To Cart</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;