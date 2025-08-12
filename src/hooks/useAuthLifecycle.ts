import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import KeycloakService from "../keycloackService";

/**
 * Hook to manage user authentication lifecycle
 * This hook should be used in components that need to react to login state changes
 */
export const useAuthLifecycle = () => {
  const { clearUserSession, initUserSession, user, isLoading } = useAppStore();

  // Handle logout - clear user session when token is no longer valid
  useEffect(() => {
    const checkAuthStatus = () => {
      if (!KeycloakService.isLoggedIn() && user) {
        clearUserSession();
      }
    };

    // Check auth status periodically
    const interval = setInterval(checkAuthStatus, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [user, clearUserSession]);

  // Handle fresh login - initialize session when user logs in
  const handleLogin = async () => {
    if (KeycloakService.isLoggedIn() && !user && !isLoading) {
      console.log("Fresh login detected, initializing session...");
      await initUserSession();
    }
  };

  return {
    user,
    isLoading,
    isLoggedIn: KeycloakService.isLoggedIn(),
    handleLogin,
    logout: () => {
      clearUserSession();
      KeycloakService.doLogout();
    },
  };
};
