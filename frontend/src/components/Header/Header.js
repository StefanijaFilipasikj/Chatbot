import { Link } from "react-router-dom";

export default function Header(props) {
    let authenticate;
    if(localStorage.getItem("JWT")){
        authenticate = (<button className="btn btn-dark" onClick={() => localStorage.removeItem("JWT")}>Logout</button>)
    } else {
        authenticate = (<Link className="btn btn-dark" to={"/login"}>Login</Link>)
    }

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand ms-1">Navbar</a>
                <div>
                    <a className="btn btn-success my-2 my-sm-0 me-1" type="submit">
                        Register
                    </a>
                    {authenticate}
                </div>
            </nav>
        </>
    );
}
