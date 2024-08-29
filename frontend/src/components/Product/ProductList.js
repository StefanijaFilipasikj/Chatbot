import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import ChatbotService from "../../repository/ChatbotRepository";
import "./Products.css";
import PriceFilter from "./Filters/PriceFilter/PriceFilter";
import filters from '../../images/filters.png';


const Products = (props) => {

    const [roles, setRoles] = useState(null);
    useEffect(() => {
        ChatbotService.getUserRole().then(resp => {
            setRoles(resp.data)
        })
    }, []);

    const [expandedSections, setExpandedSections] = useState({
        price: false,
    });

    const priceFilterRef = useRef();
    const location = useLocation();

    const toggleExpand = (section) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const clearAllFilters = (e) => {
        e.preventDefault();

        priceFilterRef.current.reset();
        const path = location.pathname;

        if (path.includes('/products/category/')) {
            const category = path.split('/').pop();
            ChatbotService.getProductsByCategory(category)
                .then(response => {
                    props.setFilteredProducts(response.data);
                });
        } else {
            props.clearFilters();
        }
    };

    const handleToggleFilters = () => {
        const sidebar = document.querySelector('.sidebar');
        if(sidebar.classList.contains('d-none')){
            sidebar.classList.remove("d-none")

        }else{
            sidebar.classList.add("d-none")
        }
    }

    const handleFilterPrice = (minPrice, maxPrice) => {
        const path = location.pathname;
        if (path.includes('/products/category/')) {
            const category = path.split('/').pop();
            ChatbotService.filterProductsByCategoryAndPrice(category, minPrice, maxPrice)
                .then(response => {
                    console.log("Filtered products by category and price:", response.data);
                    props.setFilteredProducts(response.data);
                });
        } else {
            ChatbotService.filterProductsByPrice(minPrice, maxPrice)
                .then(response => {
                    console.log("Filtered products by price:", response.data);
                    props.setFilteredProducts(response.data);
                });
        }
    };

    return (
        <div className={"row card-container m-2"}>
            <div className={"d-flex justify-content-between fixed-custom pe-4"}>
                <div className={"m-1 ms-4"}>
                    <img className={"filter-img"} src={filters} alt={"filters"}
                         onClick={() => handleToggleFilters()}/>
                </div>
            </div>
            <div className={"col-2 sidebar p-3 mb-3 mt-5 d-none"}>
                <div className={"text-center m-2 filterWrap"}>
                    <div className={"filter p-1"} onClick={() => toggleExpand('price')}>
                        <h5>Price</h5>
                    </div>
                    <div className={`m-0 expandable-content ${expandedSections.price ? 'expanded' : ''}`}>
                        <p className={"mt-4"}></p>
                        <PriceFilter ref={priceFilterRef} onFilterPrice={handleFilterPrice} />
                    </div>
                </div>
                <div className={"text-center m-2 filterWrap"}>
                    <div className="filter text-center p-1">
                        <a className={"link"} onClick={clearAllFilters}><h5>Clear filters</h5></a>
                    </div>
                </div>
            </div>
            <div className="col mt-5">
                <div className={"row d-flex m-5"}>
                    {props.products.length === 0 ?
                        <h2 className={"col px-4 text-center"}>No products matched your search</h2> :
                        props.products.map((p) => {
                            return (
                                <Link className="col-3" onClick={() => props.onDetails(p.id)} to={`/product/${p.id}`} key={p.id}>
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
        </div>
    );
}

export default Products;