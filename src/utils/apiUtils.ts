export const getSessionStorageItem = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error("Error getting session storage item:", error);
    return null;
  }
};

export const setSessionStorageItem = (key: string, value: string): void => {
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error("Error setting session storage item:", error);
  }
};

// Re-export API functions from the dedicated API service
export {
  getLoggedInUserData,
  type UserProfileData,
} from "../services/apiService";

// Re-export gateway URL function from constants
export { getGatewayUrl } from "./Constants/AppConstants";
