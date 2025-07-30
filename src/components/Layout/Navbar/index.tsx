import React, { useState, useRef } from "react";
import { useIsMobile } from "../../../hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  Edit,
  Users,
  Building,
  TrendingUp,
  Settings,
  HelpCircle,
  Shield,
  User,
  ShoppingBag,
  LogOut,
  HeartPulse,
  Bike,
  Car,
} from "lucide-react";
import styles from "./Layout.module.scss";
import Sidebar from "../Sidebar";
import { useTheme } from "../../../theme/ThemeProvider";
import KeycloakService from "../../../keycloackService";

interface LayoutProps {
  children: React.ReactNode;
}

const NAVBAR_HEIGHT = 72; // px
const SUBMENU_BORDER = "#e5b8d9";

const getNavigationItems = (role: string) => {
  const baseItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  ];
  const roleSpecificItems: Record<string, any[]> = {
    retail_customer: [
      {
        icon: ShoppingBag,
        label: "Buy Policy",
        path: "/buy-policy",
        dropdown: [
          {
            label: "Health Insurance",
            path: "/buy-policy/health",
            icon: HeartPulse,
          },
          {
            label: "Motor Insurance",
            path: "/buy-policy/four-wheeler",
            icon: Car,
          },
          {
            label: "Two Wheeler Insurance",
            path: "/buy-policy/two-wheeler",
            icon: Bike,
          },
        ],
      },
      { icon: FileText, label: "My Policy", path: "/my-policy" },
      { icon: AlertTriangle, label: "Claims", path: "/claims" },
    ],
    corporate_employee: [
      { icon: FileText, label: "Policies", path: "/policies" },
      { icon: AlertTriangle, label: "Claims", path: "/claims" },
      { icon: Edit, label: "Endorsements", path: "/endorsements" },
      { icon: Users, label: "Dependents", path: "/dependents" },
    ],
    hr_admin: [
      { icon: Users, label: "Employees", path: "/employees" },
      { icon: FileText, label: "Policies", path: "/policies" },
      { icon: Edit, label: "Endorsements", path: "/endorsements" },
      { icon: TrendingUp, label: "Analytics", path: "/analytics" },
    ],
    underwriter: [
      { icon: FileText, label: "Applications", path: "/applications" },
      { icon: Edit, label: "Endorsements", path: "/endorsements" },
      {
        icon: AlertTriangle,
        label: "Risk Assessment",
        path: "/risk-assessment",
      },
      { icon: TrendingUp, label: "Performance", path: "/performance" },
    ],
    underwriter_admin: [
      { icon: Users, label: "Underwriters", path: "/underwriters" },
      { icon: TrendingUp, label: "Analytics", path: "/analytics" },
      { icon: Settings, label: "Workflow", path: "/workflow" },
      { icon: FileText, label: "Reports", path: "/reports" },
    ],
    relationship_manager: [
      { icon: Users, label: "Clients", path: "/clients" },
      { icon: Building, label: "Prospects", path: "/prospects" },
      { icon: TrendingUp, label: "Performance", path: "/performance" },
      { icon: FileText, label: "Policies", path: "/policies" },
    ],
  };
  return [
    ...baseItems,
    ...(roleSpecificItems[role || "retail_customer"] || []),
  ];
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navItems = getNavigationItems("retail_customer");
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const isMobile = useIsMobile();
  // Detect initial mode from body attribute or default to light
  const { mode, toggleMode } = useTheme();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(null);
      }
    }
    if (userMenuOpen || dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen, dropdownOpen]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <nav className={styles["layout-navbar"]}>
        <Sidebar
          navItems={navItems}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className={styles["layout-navbar__brand"]}>
          <span className={styles["layout-navbar__brand-icon"]}>
            <Shield className="h-6 w-6 text-white" />
          </span>
          <span
            className={styles["layout-navbar__brand-title"]}
            style={{ fontSize: "1.125rem" }}
          >
            Trovity
          </span>
        </div>
        {/* Hamburger for mobile/tablet */}

        <div className={styles["layout-navbar__nav"]}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            if (item.dropdown) {
              return (
                <div
                  key={item.label}
                  className={styles["layout-navbar__dropdown"]}
                  ref={dropdownRef}
                  tabIndex={0}
                >
                  <button
                    className={[
                      styles["layout-navbar__nav-link"],
                      active ? styles["layout-navbar__nav-link--active"] : "",
                    ].join(" ")}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "0.875rem",
                    }}
                    onClick={() =>
                      setDropdownOpen(
                        dropdownOpen === item.label ? null : item.label
                      )
                    }
                  >
                    <Icon className={styles["layout-navbar__nav-link-icon"]} />
                    <span className="hidden sm:inline-block">{item.label}</span>
                    <svg
                      className={styles["layout-navbar__nav-link-chevron"]}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      style={{
                        transform:
                          dropdownOpen === item.label
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {dropdownOpen === item.label && (
                    <div
                      className={styles["layout-navbar__dropdown-menu"]}
                      style={{ borderColor: SUBMENU_BORDER }}
                    >
                      {item.dropdown.map((dropdownItem: any, index: number) => (
                        <div key={dropdownItem.label}>
                          <Link
                            to={dropdownItem.path}
                            className={[
                              styles["layout-navbar__dropdown-item"],
                              index === 0 ? "rounded-t-xl" : "",
                              index === item.dropdown.length - 1
                                ? "rounded-b-xl"
                                : "",
                              "flex items-center gap-2",
                            ].join(" ")}
                            style={{ fontSize: "0.8125rem" }}
                            onClick={() => setDropdownOpen(null)}
                          >
                            <dropdownItem.icon
                              className={styles["layout-navbar__dropdown-icon"]}
                            />
                            {dropdownItem.label}
                          </Link>
                          {index < item.dropdown.length - 1 && (
                            <div
                              className={
                                styles["layout-navbar__dropdown-divider"]
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className={[
                  styles["layout-navbar__nav-link"],
                  active ? styles["layout-navbar__nav-link--active"] : "",
                ].join(" ")}
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "0.875rem",
                }}
                title={item.label}
              >
                <Icon className={styles["layout-navbar__nav-link-icon"]} />
                <span className="hidden sm:inline-block">{item.label}</span>
              </Link>
            );
          })}
        </div>
        {/* User menu at right */}
        <div className={styles["layout-navbar__user-menu"]} ref={userMenuRef}>
          <button
            className="theme-toggle-btn"
            aria-label="Toggle dark/light mode"
            onClick={toggleMode}
            style={{
              background: "none",
              border: "none",
              marginRight: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            {mode === "dark" ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2m0 16v2m11-9h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#334155"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
          <button
            className={styles["layout-navbar__user-btn"]}
            onClick={() => setUserMenuOpen((v) => !v)}
            aria-label="User menu"
          >
            <User className="h-5 w-5 profile-avatar-icon" />
          </button>

          {userMenuOpen && (
            <div
              className={styles["layout-navbar__user-dropdown"]}
              style={{ borderColor: SUBMENU_BORDER }}
            >
              {/* Profile and Sign out block */}
              <div className={styles["layout-navbar__user-section"]}>
                <Link
                  to="/profile"
                  className={
                    styles["layout-navbar__dropdown-item"] +
                    " rounded-t-xl flex items-center gap-2"
                  }
                  style={{ fontSize: "0.8125rem" }}
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User className={styles["layout-navbar__dropdown-icon"]} />
                  Profile
                </Link>

                <div className={styles["layout-navbar__user-divider"]} />
                <button
                  className={
                    styles["layout-navbar__dropdown-item"] +
                    " rounded-b-xl flex items-center gap-2 w-full text-left"
                  }
                  style={{ fontSize: "0.8125rem" }}
                  onClick={() => KeycloakService.doLogout()}
                >
                  <LogOut className={styles["layout-navbar__dropdown-icon"]} />
                  Log out
                </button>
              </div>
              {/* Support/help block below with extra spacing */}
              <div
                className={styles["layout-navbar__user-divider"]}
                style={{ margin: "0.5rem 0" }}
              />
              <div className={styles["layout-navbar__user-section"]}>
                <Link
                  to="/support"
                  className={
                    styles["layout-navbar__dropdown-item"] +
                    " flex items-center gap-2 rounded"
                  }
                  style={{ fontSize: "0.8125rem" }}
                  onClick={() => setUserMenuOpen(false)}
                >
                  <HelpCircle
                    className={styles["layout-navbar__dropdown-icon"]}
                  />
                  Support
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div
        className="w-full"
        style={{
          marginTop: NAVBAR_HEIGHT,
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        }}
      >
        <main className="min-h-[calc(100vh-64px)] bg-white">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
