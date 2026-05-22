import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobsPage from "./pages/JobsPage";
import Navbar from "./components/Navbar";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
            path="/my-applications"
            element={
                <ProtectedRoute>
                    <MyApplicationsPage />
                </ProtectedRoute>
            }
       />
        <Route
            path="/admin"
            element={
                <AdminRoute>
                    <AdminPage />
                </AdminRoute>
            }
       />
      </Routes>
    </BrowserRouter>
  );
}

export default App;