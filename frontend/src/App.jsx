import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobsPage from "./pages/JobsPage";
import Navbar from "./components/Navbar";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import ProfilePage from "./pages/ProfilePage";
import CreateJobPage from "./pages/CreateJobPage";
import ManageJobsPage from "./pages/ManageJobsPage";
import AdminApplicationsPage from "./pages/AdminApplicationsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />

        {/* Protected user routes */}
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/create-job"
          element={
            <AdminRoute>
              <CreateJobPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-jobs"
          element={
            <AdminRoute>
              <ManageJobsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <AdminApplicationsPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;