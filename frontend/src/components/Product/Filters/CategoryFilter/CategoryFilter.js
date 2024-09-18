import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatbotService from "../../../../repository/ChatbotRepository";
import ProductList from "../../ProductList/ProductList";

const CategoryFilter = ({ onAddToCart, onDetails, onEdit, onDelete, setFilteredProducts, clearFilters, products, setSearchTerm }) => {
    const { category } = useParams();

    useEffect(() => {
        ChatbotService.getProductsByCategory(category).then((response) => {
            setFilteredProducts(response.data.content);
        });
    }, [category, setFilteredProducts]);


    return (
        <ProductList onAddToCart={onAddToCart} products={products} onDetails={onDetails} onEdit={onEdit} onDelete={onDelete} setFilteredProducts={setFilteredProducts} clearFilters={clearFilters} setSearchTerm={setSearchTerm} category={category}/>
    );
};

export default CategoryFilter;