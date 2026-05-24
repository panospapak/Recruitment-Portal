import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobsPage from "./pages/JobsPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import ProfilePage from "./pages/ProfilePage";

import CreateJobPage from "./pages/CreateJobPage";
import ManageJobsPage from "./pages/ManageJobsPage";
import AdminApplicationsPage from "./pages/AdminApplicationsPage";

import AdminHomePage from "./pages/AdminHomePage";
import UserHomePage from "./pages/UserHomePage";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <BrowserRouter>

      <AppLayout>
          <Routes>

        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />

        {/* User home */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserHomePage />
            </ProtectedRoute>
          }
        />

        {/* User protected routes */}
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

        {/* Admin home */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminHomePage />
            </AdminRoute>
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
      
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;