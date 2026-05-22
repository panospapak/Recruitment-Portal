import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const data = await register(email, password);

            localStorage.setItem("token", data.token);

            navigate("/jobs");
        } catch (error) {
            alert(error.response?.data?.message || "Register failed");
        }
    };

    return (
        <div>
            <h1>Register Page</h1>

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

            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

export default RegisterPage;