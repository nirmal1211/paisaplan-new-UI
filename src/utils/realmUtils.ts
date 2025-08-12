/**
 * Utility functions for multi-tenant realm management
 */

/**
 * Extract realm name from the current domain
 * @returns The extracted realm name
 */
export const extractRealmFromDomain = (): string => {
  const hostname = window.location.hostname;

  // Handle different domain patterns
  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    // For development, use a default realm or extract from subdomain
    const subdomainMatch = hostname.match(/^([^.]+)\./);
    return subdomainMatch ? subdomainMatch[1] : "trovity";
  }

  // For production domains like trovity.com, subdomain.trovity.com
  const realmMatch = hostname.match(/^([^.]+)\./);
  if (realmMatch) {
    return realmMatch[1];
  }

  // If no subdomain, use the main domain name as realm
  if (hostname.includes("trovity")) {
    return "trovity";
  }

  // Fallback to default realm
  return "default";
};

/**
 * Get realm from session storage config
 * @returns The realm from config or fallback
 */
export const getRealmFromConfig = (): string => {
  try {
    const config = JSON.parse(sessionStorage.getItem("config") || "{}");
    return config?.realm || "trovity"; // fallback to "trovity"
  } catch (error) {
    console.warn("Failed to parse config from session storage:", error);
    return "trovity";
  }
};

/**
 * Get the stored realm from session storage
 * @returns The stored realm or extracted realm as fallback
 */
export const getStoredRealm = (): string => {
  // First try to get from config
  const realmFromConfig = getRealmFromConfig();
  if (realmFromConfig) {
    return realmFromConfig;
  }

  // Fallback to stored realm
  const storedRealm = sessionStorage.getItem("realm");
  if (storedRealm) {
    return storedRealm;
  }

  // If no stored realm, extract and store it
  const realm = extractRealmFromDomain();
  sessionStorage.setItem("realm", realm);
  return realm;
};

/**
 * Store realm in session storage
 * @param realm The realm name to store
 */
export const storeRealm = (realm: string): void => {
  sessionStorage.setItem("realm", realm);
};

/**
 * Clear stored realm from session storage
 */
export const clearStoredRealm = (): void => {
  sessionStorage.removeItem("realm");
};

/**
 * Generate login URL for the current realm
 * @param realm Optional realm, will use realm from config if not provided
 * @returns The login URL path
 */
export const getLoginUrl = (realm?: string): string => {
  const currentRealm = realm || getRealmFromConfig();
  return `/personal/${currentRealm}`;
};

/**
 * Generate register URL for the current realm
 * @param realm Optional realm, will use realm from config if not provided
 * @returns The register URL path
 */
export const getRegisterUrl = (realm?: string): string => {
  const currentRealm = realm || getRealmFromConfig();
  return `/personal/${currentRealm}/register`;
};

/**
 * Navigate to login page using window.location (for cases where React Router is not available)
 * @param realm Optional realm, will use realm from config if not provided
 */
export const navigateToLogin = (realm?: string): void => {
  const loginUrl = getLoginUrl(realm);
  window.location.href = loginUrl;
};
