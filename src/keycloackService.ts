// KeycloakService.ts
import Keycloak, {
  KeycloakConfig,
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakTokenParsed,
} from "keycloak-js";
import { REACT_TOKEN } from "../src/utils/Constants/SessionStorageConstants";

let keycloak: KeycloakInstance | undefined;

interface KeycloakAppConfig {
  authURL: string;
  realm: string;
  clientId: string;
}

const storeToken = (token: string | undefined) => {
  sessionStorage.setItem("REACT-TOKEN", token ?? "");
};

const initKeycloak = (
  onAuthenticatedCallback: () => void,
  config: KeycloakAppConfig
) => {
  const keycloakConfig: KeycloakConfig = {
    url: `${config?.authURL}auth`,
    realm: config?.realm,
    clientId: config?.clientId,
  };

  keycloak = new Keycloak(keycloakConfig);

  const options: KeycloakInitOptions = {
    onLoad: "check-sso",
    checkLoginIframe: false,
    pkceMethod: "S256",
    // redirectUri: process.env.PUBLIC_URL,
  };

  keycloak
    .init(options)
    .then((authenticated: boolean) => {
      if (authenticated) {
        const token = keycloak!.token;
        onAuthenticatedCallback();
        sessionStorage.setItem(REACT_TOKEN, token ?? "");
      } else {
        doLogin();
      }
    })
    .catch((err) => {
      console.error("Keycloak init error", err);
    });

  keycloak.onTokenExpired = () => {
    keycloak?.updateToken(5);
  };

  keycloak.onAuthSuccess = () => storeToken(keycloak?.token);
  keycloak.onAuthRefreshSuccess = () => storeToken(keycloak?.token);
  keycloak.onAuthLogout = () => sessionStorage.clear();
};

// Helper methods
const doLogin = () => keycloak?.login();
const doLogout = () => keycloak?.logout();
const getToken = (): string | undefined => keycloak?.token;
const isLoggedIn = (): boolean => !!keycloak?.token;

const updateToken = (successCallback: () => void) =>
  keycloak
    ?.updateToken(5)
    .then(successCallback)
    .catch(() => {
      doLogin();
    });

const getTokenParsed = (): KeycloakTokenParsed | undefined =>
  keycloak?.tokenParsed as KeycloakTokenParsed | undefined;

const getUsername = (): string | undefined =>
  getTokenParsed()?.preferred_username;

const getFullname = (): string =>
  (
    (getTokenParsed()?.given_name ?? "") +
    " " +
    (getTokenParsed()?.family_name ?? "")
  ).trim();

const getSub = (): string | undefined => getTokenParsed()?.sub;
const getUserEmail = (): string | undefined => getTokenParsed()?.email;

const hasRole = (roles: string[]): boolean =>
  roles.some((role) => keycloak?.hasResourceRole(role));

const getRoles = (): string[] => getTokenParsed()?.realm_access?.roles ?? [];

// Extend token type to include custom fields like `location`
interface CustomTokenParsed extends KeycloakTokenParsed {
  location?: string;
}

const getLocation = (): string | undefined =>
  (keycloak?.tokenParsed as CustomTokenParsed | undefined)?.location;

const KeycloakService = {
  initKeycloak,
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
