import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getLoggedInUserData,
  getSessionStorageItem,
  type UserProfileData,
} from "../utils/apiUtils";
import {
  NOTIFICATION_TYPES,
  FETCH_USER_NOTIFICATION,
  SESSION_STORAGE_KEYS,
} from "../utils/Constants/AppConstants";
import { navigateToLogin } from "../utils/realmUtils";
import KeycloakService from "../keycloackService";

// Types - Use the API interface directly
export type UserData = UserProfileData;

export interface NotificationMessage {
  type: keyof typeof NOTIFICATION_TYPES;
  message: string;
  id?: string;
}

interface AppState {
  // User state
  user: UserData | null;
  isLoading: boolean;
  isTokenReady: boolean;
  isUserFetched: boolean;
  currentSessionId: string | null; // Track current session to prevent duplicate fetching

  // Notification state
  notifications: NotificationMessage[];

  // Actions
  setUser: (user: UserData | null) => void;
  setLoading: (loading: boolean) => void;
  setTokenReady: (ready: boolean) => void;
  setUserFetched: (fetched: boolean) => void;
  showNotificationMessage: (notification: NotificationMessage) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // API Actions
  fetchUserData: (userName: string, token?: string) => Promise<void>;
  initUserSession: (token?: string) => Promise<void>;
  clearUserSession: (navigateCallback?: () => void) => void;
}

export const useAppStore = create(
  devtools<AppState>(
    (set, get) => {
      return {
        // Initial state
        user: null,
        isLoading: false,
        isTokenReady: false,
        isUserFetched: false,
        currentSessionId: null,
        notifications: [],

        // Basic setters
        setUser: (user: UserData | null) => {
          set({ user });
        },
        setLoading: (isLoading: boolean) => {
          set({ isLoading });
        },
        setTokenReady: (isTokenReady: boolean) => {
          set({ isTokenReady });
        },
        setUserFetched: (isUserFetched: boolean) => {
          set({ isUserFetched });
        },

        // Notification actions
        showNotificationMessage: (notification: NotificationMessage) => {
          const id = notification.id || Date.now().toString();
          const newNotification = { ...notification, id };
          set((state: AppState) => ({
            notifications: [...state.notifications, newNotification],
          }));
        },

        removeNotification: (id: string) => {
          set((state: AppState) => ({
            notifications: state.notifications.filter(
              (n: NotificationMessage) => n.id !== id,
            ),
          }));
        },

        clearNotifications: () => set({ notifications: [] }),

        // API action: Fetch user data
        fetchUserData: async (_userName: string, token?: string) => {
          const authToken = token || KeycloakService.getToken();

          if (!authToken) {
            return;
          }

          try {
            set({ isLoading: true });
            const client = getSessionStorageItem(
              SESSION_STORAGE_KEYS.SUB_CLIENT,
            );
            const response = await getLoggedInUserData(authToken, client);

            // Handle the axios response structure
            const userData = response?.res?.data;

            const responseUserInfo: UserData = {
              ...userData,
              parentClientId: userData?.clientId,
              clientId: userData?.corporateAdminFor || userData?.clientId,
            };

            set({
              user: responseUserInfo,
              isTokenReady: true,
              isUserFetched: true,
              isLoading: false,
            });
          } catch (error) {
            set({ isLoading: false });

            // Handle different error types - axios errors have different structure
            const axiosError = error as {
              response?: { status?: number };
              status?: number;
            };
            const errorStatus =
              axiosError?.response?.status || axiosError?.status || 500;

            if (errorStatus >= 400 && errorStatus <= 499) {
              (get() as AppState).showNotificationMessage({
                type: "ERROR",
                message: FETCH_USER_NOTIFICATION.TRY_AGAIN_AFTER_SOMETIME,
              });
            } else {
              (get() as AppState).showNotificationMessage({
                type: "ERROR",
                message: FETCH_USER_NOTIFICATION.PLEASE_RELOAD_TRY_AGAIN,
              });
            }
          }
        },

        // Initialize user session after login
        initUserSession: async (token?: string) => {
          const authToken = token || KeycloakService.getToken();
          const userName = KeycloakService.getUsername();
          const currentUserId = KeycloakService.getSub(); // Use sub as unique session ID

          if (!authToken || !userName || !currentUserId) {
            return;
          }

          // Check if we already have user data for this session
          const state = get() as AppState;

          if (state.isUserFetched && state.currentSessionId === currentUserId) {
            return;
          }

          // Prevent multiple simultaneous calls
          if (state.isLoading) {
            return;
          }

          set({ currentSessionId: currentUserId });
          await (get() as AppState).fetchUserData(userName, authToken);
        },

        // Clear user session on logout
        clearUserSession: (navigateCallback?: () => void) => {
          set({
            user: null,
            isLoading: false,
            isTokenReady: false,
            isUserFetched: false,
            currentSessionId: null,
            notifications: [],
          });

          // Use provided navigation callback or fallback to window.location
          if (navigateCallback) {
            navigateCallback();
          } else {
            // Fallback to window.location if no navigation callback provided
            navigateToLogin();
          }
        },
      };
    },
    {
      name: "app-store",
    },
  ),
);
