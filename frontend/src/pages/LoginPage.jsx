import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Email and password are required");
            return;
        }

        if (!email.includes("@")) {
            alert("Please enter a valid email");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            const data = await login(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            if (data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div>
            <h1>Login Page</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
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