import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobsPage from "./pages/JobsPage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/jobs">Jobs</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;