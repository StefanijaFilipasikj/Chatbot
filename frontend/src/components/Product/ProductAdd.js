import React from 'react';
import {useNavigate} from 'react-router-dom';

const ProductAdd = (props) => {

    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        url: "",
        title: "",
        warranty: 0,
        regularPrice: 0,
        happyPrice: 0,
        imageUrl: "",
        descriptions: [{key: "", value: ""}]
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const handleDescriptionChange = (index, e) => {
        const newDescriptions = formData.descriptions.map((desc, i) => {
            if (i === index) {
                return { ...desc, [e.target.name]: e.target.value.trim() };
            }
            return desc;
        });
        updateFormData({
            ...formData,
            descriptions: newDescriptions
        });
    }

    const addDescription = () => {
        updateFormData({
            ...formData,
            descriptions: [...formData.descriptions, { key: "", value: "" }]
        });
    }

    const removeDescription = (index) => {
        const newDescriptions = formData.descriptions.filter((desc, i) => i !== index);
        updateFormData({
            ...formData,
            descriptions: newDescriptions
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const { url, title, warranty, regularPrice, happyPrice, imageUrl, descriptions } = formData;
        props.onAddProduct(url, title, warranty, regularPrice, happyPrice, imageUrl, descriptions, navigate);
    }

    return (
        <form onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="url">Product url</label>
                <input type="text" id="url" name="url" required placeholder="Enter product url" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Enter product title" required onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="warranty">Warranty</label>
                <input type="number" id="warranty" name="warranty" placeholder="Enter product warranty" required onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="regularPrice">Regular Price</label>
                <input type="number" step={0.01} id="regularPrice" name="regularPrice" placeholder="Enter product regular price" required onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="happyPrice">Happy Price</label>
                <input type="number" step={0.01} id="happyPrice" name="happyPrice" placeholder="Enter product happy price" required onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="imageUrl">Product image url</label>
                <input type="text" id="imageUrl" name="imageUrl" required placeholder="Enter product image url" onChange={handleChange} />
            </div>
            <div>
                <label>Descriptions</label>
                {formData.descriptions.map((description, index) => (
                    <div key={index}>
                        <input type="text" name="key" placeholder="Enter description key" value={description.key} onChange={(e) => handleDescriptionChange(index, e)} required/>
                        <input type="text" name="value" placeholder="Enter description value" value={description.value} onChange={(e) => handleDescriptionChange(index, e)} required/>
                        <button type="button" onClick={() => removeDescription(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addDescription}>Add Description</button>
            </div>

            <button id="submit" type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default ProductAdd;