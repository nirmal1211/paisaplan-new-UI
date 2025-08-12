import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import KeycloakService from "../../keycloackService";
import { getLoginUrl } from "../../utils/realmUtils";
import LoadingSpinner from "../UI/LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading, initUserSession, clearUserSession } = useAppStore();

  useEffect(() => {
    const initSession = async () => {
      if (KeycloakService.isLoggedIn() && !user && !isLoading) {
        await initUserSession();
      }
    };

    initSession();
  }, [user, isLoading, initUserSession]);

  // Check token expiration periodically
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!KeycloakService.isLoggedIn() && user) {
        const loginUrl = getLoginUrl();
        clearUserSession(() => {
          navigate(loginUrl, { replace: true });
        });
        return;
      }
    };

    // Check immediately
    checkTokenExpiration();

    // Check every 30 seconds
    const interval = setInterval(checkTokenExpiration, 30000);

    return () => clearInterval(interval);
  }, [user, clearUserSession, navigate]);

  // Check if user is logged in with Keycloak
  if (!KeycloakService.isLoggedIn()) {
    const loginUrl = getLoginUrl();

    navigate(loginUrl, { replace: true });
    return null;
  }

  // Show loading while fetching user data
  if (isLoading || (!user && KeycloakService.isLoggedIn())) {
    return <LoadingSpinner />;
  }

  // User is logged in and data is loaded
  return <>{children}</>;
};

export default ProtectedRoute;
