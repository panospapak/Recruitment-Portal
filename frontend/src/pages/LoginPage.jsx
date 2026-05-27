import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import HomePage from "./HomePage";

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
                navigate("/");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <>
            <HomePage />

            <div className="auth-modal-page">
                <div className="auth-card">
                    <button
                        className="auth-close"
                        onClick={() => navigate("/")}
                    >
                        ×
                    </button>

                    <div className="auth-logo">
                        <span className="hi-logo-mark">H</span>
                        <h2>Hi-Tech</h2>
                    </div>

                    <p className="auth-subtitle">
                        Sign in to continue to your account.
                    </p>

                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="auth-button"
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>

                    <p className="auth-footer">
                        Don’t have an account?{" "}
                        <Link to="/register">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default LoginPage;