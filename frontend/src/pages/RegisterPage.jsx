import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import HomePage from "./HomePage";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
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
            const data = await register(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Register failed");
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
                        Create your Hi-Tech account.
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
                        onClick={handleRegister}
                    >
                        Create account
                    </button>

                    <p className="auth-footer">
                        Already have an account?{" "}
                        <Link to="/login">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;