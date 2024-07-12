import React from "react";
import {Link} from 'react-router-dom';

const Products = (props) => {
    return (
        <div>
            <div>
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th scope={"col"}>image</th>
                        <th scope={"col"}>url</th>
                        <th scope={"col"}>title</th>
                        <th scope={"col"}>warranty</th>
                        <th scope={"col"}>regular_price</th>
                        <th scope={"col"}>happy_price</th>
                        <th scope={"col"}>description</th>
                        <th scope={"col"}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.products.map((p) => {
                        return (
                            <tr key={p.id}>
                                <td><img src={p.imageUrl} alt={"img"}/></td>
                                <td>{p.url}</td>
                                <td>{p.title}</td>
                                <td>{p.warranty}</td>
                                <td>{p.regularPrice}</td>
                                <td>{p.happyPrice}</td>
                                <td>
                                    {p.descriptions.map((d) => {
                                        return(
                                            <div key={d.id}>{d.key} {d.value}</div>
                                        )
                                    })}
                                </td>
                                <td>
                                    <Link className={"btn"} onClick={() => props.onDetails(p.id)} to={`/product/${p.id}`}>Details</Link>
                                    <Link className={"btn"} onClick={() => props.onEdit(p.id)} to={`/products/edit/${p.id}`}>Edit</Link>
                                    <a className={"btn"} title={"Delete"} onClick={() => props.onDelete(p.id)}>Delete</a>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <Link className={"btn"} to={"/products/add"}>Add new product</Link>
            </div>
        </div>
    );
}

export default Products;