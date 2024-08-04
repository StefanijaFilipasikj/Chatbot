import { useState } from "react"
import ChatbotService from "../../repository/ChatbotRepository"

export default function Login(props) {
    const [formData, setFormData] = useState({ username: "", password: "" })

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
            props.onLogin();
            //history.push("/products");
        }).catch(error => {
            console.log(error);
        })
    }

    return (<div className="row mt-5">
        <div className="col-md-5">
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input type="text"
                        className="form-control"
                        name="username"
                        required
                        placeholder="Enter username"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Password</label>
                    <input type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter password"
                        required
                        onChange={handleChange}
                    />
                </div>
                <button id="submit" type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    )
}