import React from "react";
import './Footer.css'

export default function Footer(props) {
    return(
        <footer>
            <div className={"row footer bg-primary align-items-center"}>
                <div className={"col"}>
                    <h5>MADE BY</h5>
                    <ul className={"list"}>
                        <li><a href={"#"}>Jana Trpkovska</a></li>
                        <li><a href={"#"}>Stefanija Filipasikj</a></li>
                        <li><a href={"#"}>Dejan Ristovski</a></li>
                    </ul>
                </div>
                <div className={"col"}>
                    <h5>HELP</h5>
                    <ul className={"list"}>
                        <li><a href={"#"}>Contact Us</a></li>
                        <li><a href={"#"}>Returns & Charges</a></li>
                        <li><a href={"#"}>Shipping & Delivery</a></li>
                    </ul>
                </div>
                <div className={"col"}>
                    <h5>POLICIES</h5>
                    <ul className={"list"}>
                        <li><a href={"#"}>Data Privacy</a></li>
                        <li><a href={"#"}>Security Policy</a></li>
                        <li><a href={"#"}>Terms of Use</a></li>
                    </ul>
                </div>
                <div className={"col"}>
                    <a href="/"><h1 className={"logo m-0 align-self-center"}>PRODUCT CHATBOT</h1></a>
                </div>
            </div>
        </footer>
    )
}