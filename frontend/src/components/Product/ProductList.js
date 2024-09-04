import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import ChatbotService from "../../repository/ChatbotRepository";
import "./Products.css";
import PriceFilter from "./Filters/PriceFilter/PriceFilter";
import filters from '../../images/filters.png';
import ReactPaginate from "react-paginate";


const Products = (props) => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState(null);
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    const prevValues = useRef({
        minPrice: null,
        maxPrice: null,
        searchTerm: "",
        products: []
    });

    const loc = useLocation();

    useEffect(() => {
        ChatbotService.getUserRole().then(resp => {
            setRoles(resp.data)
        });
    }, []);

    const sortProducts = (products, order) => {
        return products.slice().sort((a, b) => {
            if (order === 'lowToHigh') {
                return a.regularPrice - b.regularPrice;
            } else {
                return b.regularPrice - a.regularPrice;
            }
        });
    };

    useEffect(() => {
        if (
            currentPage !== prevValues.current.currentPage ||
            sortOrder !== prevValues.current.sortOrder ||
            minPrice !== prevValues.current.minPrice ||
            maxPrice !== prevValues.current.maxPrice ||
            props.searchTerm !== prevValues.current.searchTerm ||
            location.pathname !== prevValues.current.path
        ) {
            fetchProducts(currentPage);
        }
        prevValues.current = {
            currentPage,
            sortOrder,
            minPrice,
            maxPrice,
            searchTerm: props.searchTerm,
            products: props.products,
            path: location.pathname
        };
    }, [currentPage, sortOrder, minPrice, maxPrice, props.searchTerm, loc.pathname]);

    useEffect(() => {
        if (pageCount > 0 && currentPage >= pageCount) {
            setCurrentPage(0);
        }
    }, [pageCount]);

    const fetchProducts = (page) => {
        const path = location.pathname;
        let fetchMethod;

        if(props.searchTerm) {
            console.log(props.searchTerm)
            fetchMethod = ChatbotService.searchProducts(props.searchTerm, page, itemsPerPage);
            props.setSearchTerm("");
        } else if (path.includes('/products/category/')) {
            const category = path.split('/').pop();
            fetchMethod = minPrice !== null && maxPrice !== null
                ? ChatbotService.filterProductsByCategoryAndPrice(category, minPrice, maxPrice, page, itemsPerPage)
                : ChatbotService.getProductsByCategory(category, page, itemsPerPage);
        } else {
            fetchMethod = minPrice !== null && maxPrice !== null
                ? ChatbotService.filterProductsByPrice(minPrice, maxPrice, page, itemsPerPage)
                : ChatbotService.getAllProducts(page, itemsPerPage);
        }


        fetchMethod.then(response => {
            let products = response.data.content;
            const totalItems = response.data.totalElements;
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            props.setFilteredProducts(sortProducts(products, sortOrder));
            setPageCount(totalPages);

            if (totalPages > 0 && currentPage >= totalPages){
                setCurrentPage(0);
            }
        });
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

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
        setMinPrice(null);
        setMaxPrice(null);
        setCurrentPage(0);
        props.setSearchTerm("");
        fetchProducts(0);
    };


    const handleToggleFilters = () => {
        const sidebar = document.querySelector('.sidebar');
        if(sidebar.classList.contains('d-none')){
            sidebar.classList.remove("d-none")

        }else{
            sidebar.classList.add("d-none")
        }
    }

    const handleFilterPrice = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
        fetchProducts(currentPage);
        setCurrentPage(0);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleAddToCart = (index) => {
        props.onAddToCart(index, 1, navigate)
    }

    const handleDelete = (index) => {
        ChatbotService.deleteProduct(index)
            .then((data) => {
                fetchProducts(currentPage);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className={"row card-container m-2"}>
            <div className="sort-container ms-3 pe-5">
                <select className="form-select sort-dropdown" value={sortOrder} onChange={handleSortChange}>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>
            </div>
            <div className={"d-flex justify-content-between fixed-custom pe-4"}>
                <div className={"m-1 ms-5 ps-3"}>
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
            <div className="col">
                <div className={"row d-flex m-5"}>
                    {props.products.length === 0 ?
                        <h2 className={"col px-4 text-center"}>No products matched your search</h2> :
                        props.products.map((p) => {
                            return (
                                <Link className="col-3 mb-3" onClick={() => props.onDetails(p.id)} to={`/product/${p.id}`} key={p.id}>
                                    <div className="card p-4 rounded-0 border-0 mx-1 d-flex flex-column justify-content-between">
                                        <div>
                                            <h5 className="card-title">{p.title}</h5>
                                            <div
                                                className="card-img-top p-5 pt-3 mb-4"
                                                style={{
                                                    backgroundImage: `url(${p.imageUrl})`,
                                                    backgroundSize: 'contain',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'center',
                                                    height: '300px'
                                                }}
                                            ></div>
                                        </div>
                                        <div>
                                            <div className="card-body">
                                                {p.happyPrice !== 0 && (
                                                    <p className="card-text alert alert-warning py-2 text-warning rounded-0 border-0 border-bottom border-warning d-flex justify-content-between">
                                                        <h4 className="align-self-center m-0">HaPPy Price</h4>
                                                        <h2 className="m-0">{p.happyPrice}$</h2>
                                                    </p>
                                                )}
                                                <p className="card-text alert alert-info text-info py-2 rounded-0 border-0 border-bottom border-info d-flex justify-content-between">
                                                    <h4 className="align-self-center m-0">Regular Price</h4>
                                                    <h2 className={"m-0"}>{p.regularPrice}$</h2>
                                                </p>
                                                <a onClick={() => handleAddToCart(p.id)} className="btn btn-info rounded-0 w-100 p-2 fs-5"><span className={"fa fa-shopping-cart"}></span> Add To Cart</a>
                                                {roles == "ROLE_ADMIN" &&
                                                    <>
                                                        <Link className={"btn btn-light w-50 mt-3 fs-5"} onClick={() => props.onEdit(p.id)} to={`/products/edit/${p.id}`}><span className={"fa fa-edit"}></span> Edit</Link>
                                                        <Link className={"btn btn-light w-50 mt-3 fs-5"} title={"Delete"} onClick={() => handleDelete(p.id)}><span className={"fa fa-trash"}></span> Delete</Link>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}

                    {roles == "ROLE_ADMIN" &&
                        <Link className={"btn btn-warning text-white w-100 p-2 mt-5 fs-5"} to={"/products/add"}>Add new product</Link>
                    }
                </div>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
}

export default Products;