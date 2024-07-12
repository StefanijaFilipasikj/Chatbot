import React, {useEffect} from "react";
import {Link, useParams} from 'react-router-dom';

const Orders = ( props ) => {

    const { username } = useParams();
    useEffect(() => {
        props.getOrders(username);
    }, [username, props.getOrders]);

    return (
        <div>
            <h1>Orders for {username}</h1>
            <div>
                {props.orders.map((o) => {
                    // let totalRegular = o.productsInOrder && o.productsInOrder.map((p) => p.quantity * p.product.regularPrice).reduce((acc, current) => acc + current, 0);
                    let totalHappy = o.productsInOrder && o.productsInOrder.map((p) => p.quantity * p.product.happyPrice).reduce((acc, current) => acc + current, 0);
                    return(
                        <table className={"table"}>
                            <thead>
                                <tr>
                                    <th scope={"col"}>Product</th>
                                    <th scope={"col"}>Regular Price</th>
                                    <th scope={"col"}>Happy Price</th>
                                    <th scope={"col"}>Quantity</th>
                                    <th scope={"col"}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {o.productsInOrder && o.productsInOrder.map((p) => {
                                    return(
                                        <tr key={p.id}>
                                            <td>{p.product.title}</td>
                                            <td>{p.product.regularPrice}</td>
                                            <td>{p.product.happyPrice}</td>
                                            <td>{p.quantity}</td>
                                            <td></td>
                                        </tr>
                                    )
                                })}
                                <tr aria-colspan={5}><b>Time of order: {o.orderedAt}</b></tr>
                                {/*<tr aria-colspan={5}><b>Total regular price: {totalRegular}</b></tr>*/}
                                <tr aria-colspan={5}><b>Total happy price: {totalHappy}</b></tr>
                            </tbody>
                        </table>
                    )
                })}
            </div>
        </div>
    );
}
export default Orders;