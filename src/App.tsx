import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import LoginPage from "./pages/Auth/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import PoliciesPage from "./pages/Policies/PoliciesPage";
import MyPoliciesPage from "./pages/Policies/MyPoliciesPage";
import ClaimsPage from "./pages/Claims/ClaimsPage";
import EndorsementsPage from "./pages/Endorsements/EndorsementsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout/Navbar";
import { ThemeProvider } from "./theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
           <Routes>
  <Route path="/login" element={<LoginPage />} />
  
  <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/claims" element={<ClaimsPage />} />
    <Route path="/endorsements" element={<EndorsementsPage />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Route>
</Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;