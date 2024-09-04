import { useState } from "react"
import ChatbotService from "../../repository/ChatbotRepository"
import {useNavigate} from 'react-router-dom'
import './Auth.css'

export default function Login(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        ChatbotService.login(formData.username, formData.password).then(resp => {
            localStorage.setItem("JWT", resp.data);
            props.refreshUsername();
            navigate("/");
        }).catch(error => {
            console.log(error);
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth row justify-content-center pt-5 mb-0 min-vh-100">
            <div className="col-3 position-relative mt-5">
                <form onSubmit={onFormSubmit} className="auth-form p-5">

                    <h2 className={"auth-title text-primary"}>Login</h2>
                    <img className="logo" src="https://cdn.prod.website-files.com/5e71ed18ed23ac1f5bb16bc5/6203d4348e557b73336567ae_C%20%E2%80%93%20Was%20ist%20ein%20Chatbot_%20(Head-Grafik).svg" alt="logo"/>
                    {error && <div className={"alert alert-danger mt-2"} role="alert">{error}</div>}

                    <div className="form-group mb-4">
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            required
                            placeholder="Enter username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-4 position-relative">
                        <label htmlFor="price">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            placeholder="Enter password"
                            required
                            onChange={handleChange}
                        />
                        <span className={`password-eye fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} id="togglePassword" onClick={togglePasswordVisibility}></span>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="rememberMe">Remember me?&nbsp;</label>
                        <input
                            type={"checkbox"}
                            className={"form-check-input"}
                            name={"rememberMe"}
                            onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-warning text-white w-100 my-4">Submit</button>
                </form>
                <div className={"mt-4 pb-5"}>
                    Don't have an account yet?
                    <a href={"register"} className="btn btn-info text-white w-100 mb-5">Register Now</a>
                </div>
            </div>
        </div>
    )
}