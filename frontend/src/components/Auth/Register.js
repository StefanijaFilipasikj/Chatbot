import { useEffect, useState } from "react";
import ChatbotService from "../../repository/ChatbotRepository"

export default function Register(props) {
    const [formData, setFormData] = useState({username: "", password: "", repeatPassword: "", role: null})
    const [error, setError] = useState(null);
    const [roles, setRoles] = useState(null);

    useEffect(() => {
        ChatbotService.getUserRole().then(resp => {
            setRoles(resp.data)
        })
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        ChatbotService.register(formData.username, formData.password, formData.repeatPassword, formData.role).then(resp => {
            setError(null)
        }).catch(error => {
            setError(error.response.data)
        })
    }

    return (<div className="row mt-5">
        <div className="col-md-5">
        {error && <div class="alert alert-danger" role="alert">{error}</div>}
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
                <div className="form-group">
                    <label htmlFor="price">Repeat Password</label>
                    <input type="password"
                        className="form-control"
                        name="repeatPassword"
                        placeholder="Enter password"
                        required
                        onChange={handleChange}
                    />
                </div>
                {roles == "ROLE_ADMIN" &&
                <div className="form-group">
                    <label htmlFor="price">Role</label>
                    <select name="role" required onChange={handleChange} className="form-control">
                        {props.roles.map((role, i) => <option key={i}>{role}</option>)}
                    </select>
                </div>
                }
                <button id="submit" type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    )
}