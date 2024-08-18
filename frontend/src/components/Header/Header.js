import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useLayoutEffect, useState} from "react";
import ChatbotService from "../../repository/ChatbotRepository";
import './Header.css';

export default function Header(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        ChatbotService.getUserUsername().then(resp => {
            setUsername(resp.data)
        })
    }, []);

    useLayoutEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            const headerHeight = header.offsetHeight;
            console.log(headerHeight)
            document.body.style.paddingTop = `${headerHeight}px`;
        }
    }, []);


    let authenticate;
    if(localStorage.getItem("JWT")){
        authenticate = (
            <>
                <span id={"username"} className={"nav-link fs-6 text-white align-self-center text-truncate"}>{username}</span>
                <a className={"nav-link px-3 fs-4 text-white"} href={`/shopping-cart/${username}`}><span className={"fa fa-shopping-cart"}></span></a>
                <button className="nav-link ps-3 fs-4 text-white" onClick={() => {localStorage.removeItem("JWT"); navigate("/login");}}><span className={"fa fa-user-times"}></span></button>
            </>
        )
    } else {
        authenticate = (<Link className="nav-link ps-3 fs-4 text-white" to={"/login"}><span className={"fa fa-user"}></span></Link>)
    }

    return (
        <header className={"fixed-top"}>
            <nav className="navbar navbar-expand bg-primary py-3">
                <div className="container-fluid mx-5">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <a className="col-4 navbar-brand mb-2" href="/"><span className={"text-white title"}>PRODUCT CHATBOT</span></a>
                        <form className="d-flex me-3 w-100 justify-content-end">
                            <input className="form-control w-50 rounded-0" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn-search bg-transparent border-0" type="submit"><span className={"fa fa-search"}></span></button>
                        </form>
                        <div className={"d-flex"}>
                            {authenticate}
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand bg-light p-0 m-0">
                <div className="container-fluid mx-5">

                    <ul className="navbar-nav">
                        <li className="nav-item me-3 px-3 py-2">
                            <a className="nav-link" href="#">Category1</a>
                        </li>
                        <li className="nav-item me-3 px-3 py-2">
                            <a className="nav-link" href="#">Category2</a>
                        </li>
                        <li className="nav-item me-3 px-3 py-2">
                            <a className="nav-link" href="#">Category3</a>
                        </li>
                        <li className="nav-item me-3 px-3 py-2">
                            <a className="nav-link" href="#">Category4</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}