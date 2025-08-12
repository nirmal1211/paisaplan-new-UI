// API Base URL - adjust according to your backend
const config = JSON.parse(sessionStorage.getItem("config"));

export const getGatewayUrl = () => config?.gatewayURL || "";

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
} as const;

// Fetch User Notifications
export const FETCH_USER_NOTIFICATION = {
  TRY_AGAIN_AFTER_SOMETIME:
    "Something went wrong. Please try again after sometime.",
  PLEASE_RELOAD_TRY_AGAIN: "Please reload the page and try again.",
} as const;

// Session Storage Keys
export const SESSION_STORAGE_KEYS = {
  SUB_CLIENT: "sub-client",
  USER_DATA: "user-data",
} as const;
