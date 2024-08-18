import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import ChatbotService from "../../repository/ChatbotRepository";
import "./Products.css";

const Products = (props) => {

    const [roles, setRoles] = useState(null);
    useEffect(() => {
        ChatbotService.getUserRole().then(resp => {
            setRoles(resp.data)
        })
    }, []);

    return (
        <div>
            <div className={"row d-flex m-5"}>
                {props.products.map((p) => {
                    return (
                        <Link className="col-3" onClick={() => props.onDetails(p.id)} to={`/product/${p.id}`}>
                            <div className="card p-4 rounded-0 border-0 mx-1 mb-4">
                                <h5 className="card-title">{p.title}</h5>
                                <img src={p.imageUrl} className="card-img-top p-5 pt-3" alt="img"/>
                                <div className="card-body">
                                    <p className="card-text alert alert-danger text-danger rounded-0 border-top-0 d-flex justify-content-between">
                                        <h4 className="align-self-center m-0">HaPPy Price</h4>
                                        <h2 className="m-0">{p.happyPrice}$</h2>
                                    </p>
                                    <p className="card-text alert alert-primary text-primary rounded-0 border-top-0 d-flex justify-content-between">
                                        <h4 className="align-self-center m-0">Regular Price</h4>
                                        <h2 className={"m-0"}>{p.regularPrice}$</h2>
                                    </p>
                                    <a href="#" className="btn btn-info w-100 p-2 fs-5"><span className={"fa fa-shopping-cart"}></span> Add To Cart</a>
                                    {roles == "ROLE_ADMIN" &&
                                        <>
                                            <Link className={"btn btn-light w-50 mt-3 fs-5"} onClick={() => props.onEdit(p.id)} to={`/products/edit/${p.id}`}><span className={"fa fa-edit"}></span> Edit</Link>
                                            <Link className={"btn btn-light w-50 mt-3 fs-5"} title={"Delete"} onClick={() => props.onDelete(p.id)}><span className={"fa fa-trash"}></span> Delete</Link>
                                        </>
                                    }
                                </div>
                            </div>
                        </Link>
                        );
                })}

                {roles == "ROLE_ADMIN" &&
                    <Link className={"btn btn-warning text-white w-100 p-2 mt-5 fs-5"} to={"/products/add"}>Add new product</Link>
                }
            </div>
        </div>
    );
}

export default Products;