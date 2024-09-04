import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatbotService from "../../../../repository/ChatbotRepository";
import ProductList from "../../ProductList";

const CategoryFilter = ({ onDetails, onEdit, onDelete, setFilteredProducts, clearFilters, products, setSearchTerm }) => {
    const { category } = useParams();


    useEffect(() => {
        ChatbotService.getProductsByCategory(category).then((response) => {
            setFilteredProducts(response.data.content);
        });
    }, [category, setFilteredProducts]);


    return (
        <>
            <h1 className="text-center m-0 mt-5 text-warning fs-1">{category.toUpperCase()}</h1>
            <ProductList products={products} onDetails={onDetails} onEdit={onEdit} onDelete={onDelete} setFilteredProducts={setFilteredProducts} clearFilters={clearFilters} setSearchTerm={setSearchTerm}/>
        </>
    );
};

export default CategoryFilter;