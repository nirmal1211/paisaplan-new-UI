import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./contexts/AuthContext";
import { ThemeProvider } from "./theme/ThemeProvider";
import { appRoutes } from "./appRoutes";

const AppRoutes = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

const AppContent = () => {
  return (
    <>
      <div className="h-screen bg-gray-50 overflow-hidden">
        <AppRoutes />
      </div>
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
