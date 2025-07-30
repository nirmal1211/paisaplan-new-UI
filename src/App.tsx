import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./contexts/AuthContext";
import ComprehensiveDashboard from "./pages/Dashboard/ComprehensiveDashboard";
import MyPoliciesPage from "./pages/Policies/MyPoliciesPage";
import InsuranceDetailsPage from "./pages/Policies/InsuranceDetailsPage";
import ClaimsPage from "./pages/Claims/ClaimsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import PurchaseFlow from "./pages/Purchase/PurchaseFlow";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout/Navbar";
import { ThemeProvider } from "./theme/ThemeProvider";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                {/* Purchase Flow Routes - With consistent navbar */}
                <Route
                  path="personal/buy-policy/*"
                  element={
                    <ProtectedRoute>
                      <PurchaseFlow />
                    </ProtectedRoute>
                  }
                />

                {/* Main Application Routes - Inside Layout */}

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <ComprehensiveDashboard />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/claims"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <ClaimsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <ProfilePage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-policy"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <MyPoliciesPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/insurance-details/:id"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <InsuranceDetailsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
