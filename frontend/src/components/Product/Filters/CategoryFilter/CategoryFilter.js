import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatbotService from "../../../../repository/ChatbotRepository";
import ProductList from "../../ProductList";

const CategoryFilter = ({ onDetails, onEdit, onDelete, setFilteredProducts, clearFilters, products }) => {
    const { category } = useParams();


    useEffect(() => {
        ChatbotService.getProductsByCategory(category).then((response) => {
            setFilteredProducts(response.data);
        });
    }, [category]);


    return <ProductList products={products} onDetails={onDetails} onEdit={onEdit} onDelete={onDelete} setFilteredProducts={setFilteredProducts} clearFilters={clearFilters}/>;
};

export default CategoryFilter;