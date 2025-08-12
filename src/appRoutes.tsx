import React, { useEffect, useRef } from "react";
import { RouteObject, useNavigate } from "react-router-dom";
import ComprehensiveDashboard from "./pages/Dashboard/ComprehensiveDashboard";
import MyPoliciesPage from "./pages/Policies/MyPoliciesPage";
import InsuranceDetailsPage from "./pages/Policies/InsuranceDetailsPage";
import ClaimsPage from "./pages/Claims/ClaimsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import PurchaseFlow from "./pages/Purchase/PurchaseFlow";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout/Navbar";
import KeycloakService from "./keycloackService";
import { useAppStore } from "./store/useAppStore";

const LoginRedirect = () => {
  const navigate = useNavigate();
  const { initUserSession } = useAppStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    const handleRedirect = async () => {
      // Prevent double initialization in React StrictMode
      if (hasInitialized.current) {
        return;
      }

      hasInitialized.current = true;

      if (KeycloakService.isLoggedIn()) {
        // Initialize user session (fetch user data) only on login redirect
        // This prevents duplicate API calls when navigating between routes
        await initUserSession();
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };

    handleRedirect();
  }, [navigate, initUserSession]);

  return null;
};

// Protected Layout wrapper component
const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

export const appRoutes: RouteObject[] = [
  // Purchase Flow Routes - With consistent navbar
  {
    path: "buy-policy/*",
    element: (
      <ProtectedLayout>
        <PurchaseFlow />
      </ProtectedLayout>
    ),
  },

  // Main Application Routes - Inside Layout
  {
    path: "/dashboard",
    element: (
      <ProtectedLayout>
        <ComprehensiveDashboard />
      </ProtectedLayout>
    ),
  },

  {
    path: "/claims",
    element: (
      <ProtectedLayout>
        <ClaimsPage />
      </ProtectedLayout>
    ),
  },

  {
    path: "/profile",
    element: (
      <ProtectedLayout>
        <ProfilePage />
      </ProtectedLayout>
    ),
  },

  {
    path: "/my-policy",
    element: (
      <ProtectedLayout>
        <MyPoliciesPage />
      </ProtectedLayout>
    ),
  },

  {
    path: "/insurance-details/:id",
    element: (
      <ProtectedLayout>
        <InsuranceDetailsPage />
      </ProtectedLayout>
    ),
  },

  {
    path: "/personal/:realm",
    element: <LoginRedirect />,
  },

  {
    path: "/personal/trovity",
    element: <LoginRedirect />,
  },
];
