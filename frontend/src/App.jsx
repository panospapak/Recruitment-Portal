import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobsPage from "./pages/JobsPage";
import Navbar from "./components/Navbar";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/my-applications" element={<MyApplicationsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;