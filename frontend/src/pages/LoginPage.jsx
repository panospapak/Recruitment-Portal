import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const data = await login(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            console.log(data);

            navigate("/jobs");

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <div>

            <h1>Login Page</h1>

            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    );
}

export default LoginPage;