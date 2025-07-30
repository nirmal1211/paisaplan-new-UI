import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/theme.css";
import KeycloakService from "./keycloackService.ts";
import { REACT_TOKEN } from "./utils/Constants/SessionStorageConstants.ts";

const rootElement = document.getElementById("root");

const renderRoot = () => {
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    console.error("Root element not found");
  }
};

// Check if authentication is required based on route
const requiresAuth = () => {
  const publicRoutes = ["/", "/home", "/login", "/about", "/contact"];
  const currentPath = window.location.pathname;
  return !publicRoutes.includes(currentPath);
};

// Renders the landing (Home) page for unauthenticated users
const renderLanding = (config) => {
  if (config && config.realm) {
    const targetUrl = `/personal/${config.realm}`;
    if (window.location.pathname !== targetUrl) {
      window.location.replace(targetUrl);
      return;
    }
  }
  if (rootElement) {
    const root = createRoot(rootElement);
    // Home expects onLogin and config props
    import("./pages/Home/Home").then(({ default: Home }) => {
      root.render(
        <StrictMode>
          <Home
            onLogin={() => KeycloakService.initAndLogin(config)}
            config={config}
          />
        </StrictMode>
      );
    });
  } else {
    console.error("Root element not found");
  }
};
const initializeApp = () => {
  if (requiresAuth()) {
    // Authentication required for protected routes
    if (sessionStorage.getItem(REACT_TOKEN)) {
      const envs = sessionStorage.getItem("config");
      if (envs) {
        const config = JSON.parse(envs);
        KeycloakService.initKeycloak(
          () => {
            renderRoot();
            if (window.location.pathname !== "/dashboard") {
              window.location.replace("/dashboard");
            }
          },
          config,
          () => {
            // Only redirect to /personal/:realm for logout/session timeout
            renderLanding(config);
          }
        );
      }
    } else {
      fetch(`${"https://apps-dev.trovity.com"}${window.location.pathname}.json`)
        .then(async (r) => r.json())
        .then((config) => {
          sessionStorage.setItem("config", JSON.stringify(config));
          // For unauthenticated, show landing (may redirect to /personal/:realm)
          renderLanding(config);
        })
        .catch(() => {
          if (rootElement) {
            const root = createRoot(rootElement);
            root.render(<h6>Error Loading Application</h6>);
          }
        });
    }
  } else {
    // No authentication required for public routes
    renderRoot();
  }
};

// Initialize the application
initializeApp();
