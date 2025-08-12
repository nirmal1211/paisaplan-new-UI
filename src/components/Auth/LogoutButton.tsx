import React from "react";
import { useLogout } from "../../hooks/useLogout";

/**
 * Example logout button component
 * Use this pattern in your navbar or anywhere you need a logout button
 */
const LogoutButton: React.FC = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    // This will:
    // 1. Clear the user session from Zustand store
    // 2. Navigate to /personal/{realmFromConfig} using React Router
    // 3. Call Keycloak logout
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
