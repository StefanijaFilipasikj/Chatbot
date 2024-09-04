import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductEdit = (props) => {

    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        url: "",
        title: "",
        warranty: 0,
        regularPrice: 0,
        happyPrice: 0,
        imageUrl: "",
        descriptions: [{ key: "", value: "" }]
    });

    useEffect(() => {
        if (props.product) {
            updateFormData({
                url: props.product.url,
                title: props.product.title,
                warranty: props.product.warranty,
                regularPrice: props.product.regularPrice,
                happyPrice: props.product.happyPrice,
                imageUrl: props.product.imageUrl,
                descriptions: props.product.descriptions || [{ key: "", value: "" }]
            });
        }
    }, [props.product]);

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
        console.log(formData)
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const { url, title, warranty, regularPrice, happyPrice, imageUrl, descriptions } = formData;
        props.onEditProduct(props.product.id, url, title, warranty, regularPrice, happyPrice, imageUrl, descriptions, navigate);
    }

    return (
        <div className="container p-5 my-5 border rounded-3">
            <h1 className="text-center text-primary mb-4">Edit Product</h1>
            <form onSubmit={onFormSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="url">Product url</label>
                    <input className="form-control" type="text" id="url" name="url" required value={formData.url} placeholder={props.product.url} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" type="text" id="title" name="title" placeholder={props.product.title} required value={formData.title} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="warranty">Warranty</label>
                    <input className="form-control" type="number" id="warranty" name="warranty" placeholder={props.product.warranty} required value={formData.warranty} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="regularPrice">Regular Price</label>
                    <input className="form-control" type="number" step={0.01} id="regularPrice" name="regularPrice" placeholder={props.product.regularPrice} required value={formData.regularPrice} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="happyPrice">Happy Price</label>
                    <input className="form-control" type="number" step={0.01} id="happyPrice" name="happyPrice" placeholder={props.product.happyPrice} required value={formData.happyPrice} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="imageUrl">Product image url</label>
                    <input className="form-control" type="text" id="imageUrl" name="imageUrl" placeholder={props.product.imageUrl} required value={formData.imageUrl} onChange={handleChange} />
                </div>
                <div className="form-group mb-3 border rounded-3 p-3">
                    <label className="mb-3">Descriptions</label>
                    {formData.descriptions.map((description, index) => (
                        <div className="d-flex mb-3" key={index}>
                            <input className="form-control me-2" type="text" name="key" placeholder="Enter description key" value={description.key} onChange={(e) => handleDescriptionChange(index, e)} required />
                            <input className="form-control me-2" type="text" name="value" placeholder="Enter description value" value={description.value} onChange={(e) => handleDescriptionChange(index, e)} required />
                            <button className="btn btn-info" type="button" onClick={() => removeDescription(index)}>Remove</button>
                        </div>
                    ))}
                    <button className="btn btn-info" type="button" onClick={addDescription}>Add Description</button>
                </div>

                <button className="btn btn-warning w-100 text-white" id="submit" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProductEdit;