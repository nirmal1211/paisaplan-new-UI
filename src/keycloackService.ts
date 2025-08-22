import Keycloak, {
  KeycloakInitOptions,
  KeycloakConfig,
  KeycloakTokenParsed,
} from "keycloak-js";
import { REACT_TOKEN } from "./utils/Constants/SessionStorageConstants";

let keycloak: Keycloak.KeycloakInstance;

const storeToken = (token: string | undefined) => {
  sessionStorage.setItem(REACT_TOKEN, token ?? "");
};

interface AuthConfig {
  authURL: string;
  realm: string;
  clientId: string;
}

type VoidCallback = () => void;

const initKeycloak = (
  onAuthenticatedCallback: VoidCallback,
  config: AuthConfig,
  onUnauthenticatedCallback?: VoidCallback,
) => {
  const keycloakConfig: KeycloakConfig = {
    url: `${config.authURL}auth`,
    realm: config.realm,
    clientId: config.clientId,
  };

  keycloak = new Keycloak(keycloakConfig);

  const options: KeycloakInitOptions = {
    onLoad: "check-sso",
    checkLoginIframe: false,
    pkceMethod: "S256",
    redirectUri: window.location.origin + window.location.pathname,
  };

  keycloak
    .init(options)
    .then((authenticated) => {
      if (authenticated) {
        storeToken(keycloak.token);
        onAuthenticatedCallback();
      } else {
        onUnauthenticatedCallback?.();
      }
    })
    .catch((err) => {
      console.error("Keycloak init error", err);
    });

  keycloak.onTokenExpired = () => {
    keycloak.updateToken(5).catch(() => {
      console.log("❌ Token refresh failed, need to redirect to login");
      // Don't navigate here - let the components handle it
      // This will be handled by ProtectedRoute or store clearUserSession
    });
  };

  keycloak.onAuthSuccess = () => storeToken(keycloak.token);
  keycloak.onAuthRefreshSuccess = () => storeToken(keycloak.token);
  keycloak.onAuthLogout = () => {
    sessionStorage.clear();
  };
};

const initAndLogin = (config: AuthConfig) => {
  const keycloakConfig: KeycloakConfig = {
    url: `${config.authURL}auth`,
    realm: config.realm,
    clientId: config.clientId,
  };

  keycloak = new Keycloak(keycloakConfig);

  const options: KeycloakInitOptions = {
    onLoad: "login-required",
    checkLoginIframe: false,
    pkceMethod: "S256",
    redirectUri: window.location.origin + window.location.pathname,
  };

  keycloak.init(options).catch((err) => {
    console.error("Keycloak login error", err);
  });
};

const doLogin = () => keycloak?.login();
const doLogout = () => {
  // Clear session storage but don't navigate here
  sessionStorage.clear();

  // Call Keycloak logout
  keycloak?.logout();

  // Navigation will be handled by the store's clearUserSession
};
const getToken = () => keycloak?.token ?? "";
const isLoggedIn = () => !!keycloak?.token;

const updateToken = (successCallback: () => void) => {
  return keycloak
    ?.updateToken(5)
    .then(successCallback)
    .catch(() => doLogin());
};

const getTokenParsed = (): KeycloakTokenParsed | undefined =>
  keycloak?.tokenParsed;

const getUsername = (): string | undefined =>
  getTokenParsed()?.preferred_username;

const getFullname = (): string =>
  `${getTokenParsed()?.given_name ?? ""} ${
    getTokenParsed()?.family_name ?? ""
  }`.trim();

const getSub = (): string | undefined => getTokenParsed()?.sub;
const getUserEmail = (): string | undefined => getTokenParsed()?.email;

const hasRole = (roles: string[]): boolean =>
  roles.some((role) => keycloak?.hasResourceRole?.(role));

const getRoles = (): string[] => getTokenParsed()?.realm_access?.roles ?? [];

const getLocation = (): string | undefined =>
  (getTokenParsed() as Record<string, unknown>)?.location as string | undefined;

const KeycloakService = {
  initKeycloak,
  initAndLogin,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  getFullname,
  getSub,
  getUserEmail,
  hasRole,
  getLocation,
  getRoles,
  getTokenParsed,
};

export default KeycloakService;
