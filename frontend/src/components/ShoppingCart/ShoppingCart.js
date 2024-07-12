import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ShoppingCart = ({ getShoppingCart, shoppingCart, onEditProduct, onRemoveProduct, onOrder }) => {
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

    let totalRegular = shoppingCart.productsInCart && shoppingCart.productsInCart.map((p) => p.quantity * p.product.regularPrice).reduce((acc, current) => acc + current, 0);
    let totalHappy = shoppingCart.productsInCart && shoppingCart.productsInCart.map((p) => p.quantity * p.product.happyPrice).reduce((acc, current) => acc + current, 0);

    return (
        <div>
            <h1>Shopping Cart for {username}</h1>
            <h2>{shoppingCart.id}</h2>

            <table className={"table"}>
                <thead>
                <tr>
                    <th scope={"col"}>Product</th>
                    <th scope={"col"}>Regular Price</th>
                    <th scope={"col"}>Happy Price</th>
                    <th scope={"col"}>Quantity</th>
                    <th scope={"col"}></th>
                    <th scope={"col"}></th>
                </tr>
                </thead>
                <tbody>
                {shoppingCart.productsInCart && shoppingCart.productsInCart.map((p) => (
                    <tr key={p.id}>
                        {p.product && (
                            <>
                                <td>id: {p.product.id}, {p.product.title}</td>
                                <td>{p.product.regularPrice}</td>
                                <td>{p.product.happyPrice}</td>
                                <td>
                                    <form onSubmit={(e) => onFormSubmit(e, p.id)}>
                                        <input type="hidden" name="productId" value={p.product.id}/>
                                        <input type="number" min={1} name="quantity" value={formData[p.id]?.quantity || p.quantity} onChange={(e) => handleChange(e, p.id)} />
                                        <button type="submit">Change</button>
                                    </form>
                                </td>
                                <td>
                                    <button onClick={() => onRemoveProduct(p.id, navigate)}>Remove from cart</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            <p>Total Regular price: {totalRegular}</p>
            <p>Total Happy price: {totalHappy}</p>

            <button onClick={() => onOrder(shoppingCart.id, navigate)}>Order Now</button>
        </div>
    );
};

export default ShoppingCart;