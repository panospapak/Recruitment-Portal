import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobsPage from "./pages/JobsPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import ProfilePage from "./pages/ProfilePage";

import AdminHomePage from "./pages/AdminHomePage";
import CreateJobPage from "./pages/CreateJobPage";
import ManageJobsPage from "./pages/ManageJobsPage";
import AdminApplicationsPage from "./pages/AdminApplicationsPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import JobDetailsPage from "./pages/JobDetailsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />

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

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminHomePage />
                        </AdminRoute>
                    }
                />

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