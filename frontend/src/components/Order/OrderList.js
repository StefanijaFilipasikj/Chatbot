import React, {useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import "./OrderList.css";

const Orders = ( props ) => {

    const { username } = useParams();
    useEffect(() => {
        props.getOrders(username);
    }, [username, props.getOrders]);

    return (
        <div className="container py-5">
            <h1 className="mb-5">Orders for {username}</h1>
            <div>
                {props.orders.map((o) => {
                    let total = o.productsInOrder?.map((p) => p.quantity * (p.product.happyPrice != 0.0 ? p.product.happyPrice : p.product.regularPrice)).reduce((sum, price) => sum + price, 0) || 0.0;

                    return(
                        <div className={"mb-5"}>
                            <h6>Order: #{o.id}</h6>
                            <h6>Time of order: {o.orderedAt}</h6>
                            <table className={"table border rounded-3"}>
                                <thead>
                                <tr>
                                    <th className="p-3 bg-lightblue" scope={"col"}>Product</th>
                                    <th className="p-3 bg-lightblue text-end" scope={"col"}>Price</th>
                                    <th className="p-3 bg-lightblue text-end" scope={"col"}>Quantity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {o.productsInOrder && o.productsInOrder.map((p) => {
                                    return(
                                        <tr key={p.id}>
                                            <td className="p-3">{p.product.title}</td>
                                            <td className="p-3 text-end">{p.product.happyPrice != 0.0 ? p.product.happyPrice : p.product.regularPrice}</td>
                                            <td className="p-3 text-end">{p.quantity}</td>
                                        </tr>
                                    )
                                })}
                                <tr className="p-3 fw-bold text-end">
                                    <td className="bg-light" colSpan={3}>Total price: {total.toFixed(2)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default Orders;