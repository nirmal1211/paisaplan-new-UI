import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import KeycloakService from "../keycloackService";
import { getLoginUrl } from "../utils/realmUtils";

/**
 * Custom hook for handling logout with proper navigation
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const { clearUserSession } = useAppStore();

  const logout = () => {
    // Get the realm-specific login URL
    const loginUrl = getLoginUrl();

    // Clear the user session with navigation callback
    clearUserSession(() => {
      navigate(loginUrl, { replace: true });
    });

    // Also call Keycloak logout
    KeycloakService.doLogout();
  };

  return { logout };
};
