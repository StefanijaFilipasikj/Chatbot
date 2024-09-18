import React, {useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './ShoppingCart.css';

const ShoppingCart = ({ getShoppingCart, shoppingCart, onEditProduct, onRemoveProduct, onOrder, onDetails }) => {
    const navigate = useNavigate();
    const { username } = useParams();

    useEffect(() => {
        getShoppingCart(username);
    }, [username, getShoppingCart]);

    const [formData, updateFormData] = useState({});

    useEffect(() => {
        if (shoppingCart.products) {
            const initialFormData = shoppingCart.products.reduce((acc, p) => {
                acc[p.id] = {
                    productId: p.product.id,
                    quantity: p.quantity
                };
                return acc;
            }, {});
            updateFormData(initialFormData);
        }
    }, [shoppingCart]);

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        updateFormData((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [name]: value.trim()
            }
        }));
    }

    const onFormSubmit = (e, id) => {
        e.preventDefault();
        const { productId, quantity } = formData[id];
        onEditProduct(id, productId, quantity, navigate);
    }

    let total = shoppingCart.productsInCart?.map((p) => p.quantity * (p.product.happyPrice != 0.0 ? p.product.happyPrice : p.product.regularPrice)).reduce((sum, price) => sum + price, 0) || 0.0;
    let count = shoppingCart.productsInCart?.map(p => p.quantity).reduce((sum, quantity) => sum + quantity, 0);

    return (
        <div className={"row m-4 p-1"}>
            {/*<h1>Shopping Cart for {username}</h1>*/}
            <div className={"col-8"}>
                {shoppingCart.productsInCart && shoppingCart.productsInCart.map((p, index) => (
                    <div className="card cart-card border-0 rounded-0 me-5 position-relative" key={p.id}>
                        <button className="btn-close-absolute text-primary" type="button" onClick={() => onRemoveProduct(p.id, navigate)}>&#10005;</button>
                        <div className="row d-flex align-items-center">

                            {p.product && (
                                <>
                                    <div className="row d-flex p-5">
                                        <Link onClick={() => onDetails(p.product.id)} to={`/product/${p.product.id}`} className={"col-4 align-self-center"}>
                                            <div
                                                className="card-img-top p-5 pt-3 mb-4"
                                                style={{
                                                    backgroundImage: `url(${p.product.imageUrl})`,
                                                    backgroundSize: 'contain',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'center',
                                                    height: '300px'
                                                }}
                                            ></div>
                                        </Link>
                                        <div className={"col-5 align-self-center"}>
                                            <div>
                                                <h5>{p.product.title}</h5>
                                            </div>
                                            <div className={"mt-4"}>
                                                <h6>Quantity: <strong>{p.quantity}</strong></h6>
                                                <h6>Price: <strong>{p.quantity * (p.product.happyPrice != 0.0 ? p.product.happyPrice : p.product.regularPrice)}$</strong></h6>
                                            </div>
                                        </div>
                                        <div className={"col-3 align-self-center"}>
                                            <form onSubmit={(e) => onFormSubmit(e, p.id)}>
                                                <input type="hidden" name="productId" value={p.product.id}/>
                                                <label>Quantity</label>
                                                <div className="d-flex">
                                                    <input className="form-control rounded-0" type="number" min={1} name="quantity" value={formData[p.id]?.quantity || p.quantity} onChange={(e) => handleChange(e, p.id)} />
                                                    <button className="btn btn-warning text-white" type="submit">Change</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {!shoppingCart.productsInCart && (
                <div className="fs-1">
                    No products in Shopping Cart
                </div>
            )}

            <div className={"col-4 order-summary mx-4 p-3"}>
                <h3 className={"m-2 text-primary"}><strong>Order Summary</strong></h3>
                <hr/>
                {
                    shoppingCart.productsInCart &&
                    <>
                        <br/>
                        {shoppingCart.productsInCart &&
                            shoppingCart.productsInCart.map((p, index) => (
                                <div>
                                    {p.product.title} <b>x {p.quantity}</b>
                                    {p.product.happyPrice !== 0 && <div className="badge py-1 px-2 border rounded-5 text-warning">happy</div>}
                                </div>
                            ))
                        }
                        <br/><hr/>
                    </>
                }


                <div>
                    <h5>Item count: {count}</h5>
                    <h5>Total price: {total.toFixed(2)}$</h5>
                </div>
                <button className="btn btn-primary w-100 mt-3 p-2 rounded-0 fs-5" onClick={() => onOrder(shoppingCart.id, navigate)}>Order Now</button>
            </div>
        </div>
    );
};

export default ShoppingCart;