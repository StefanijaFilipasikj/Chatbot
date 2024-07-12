import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
        <div>
            <img src={product.imageUrl} alt={"img"}/>
            <p>URL: {product.url}</p>
            <p>TITLE: {product.title}</p>
            <p>WARRANTY: {product.warranty}</p>
            <p>REGULAR PRICE: {product.regularPrice}</p>
            <p>HAPPY PRICE: {product.happyPrice}</p>
            <p>
                DESCRIPTION:
                {product.descriptions && product.descriptions.map((d) => {
                    return(
                        <span> {d.key} {d.value},</span>
                    )
                })}
            </p>

            <form onSubmit={onFormSubmit}>
                <input type="number" min={1} name="quantity" onChange={handleChange}/>
                <button type="submit">Add To Cart</button>
            </form>
        </div>
    );
};

export default ProductDetails;