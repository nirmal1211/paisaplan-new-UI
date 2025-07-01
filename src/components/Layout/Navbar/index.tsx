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
        icon: FileText,
        label: "Policy",
        path: "/my-policy",
        dropdown: [
          {
            label: "Buy Policy",
            icon: ShoppingBag,
            submenu: [
              {
                label: "Health Insurance",
                path: "/buy-policy/health",
                icon: HeartPulse,
              },
              {
                label: "Two Wheeler Insurance",
                path: "/buy-policy/two-wheeler",
                icon: Bike,
              },
              {
                label: "Four Wheeler Insurance",
                path: "/buy-policy/four-wheeler",
                icon: Car,
              },
            ],
          },
          { label: "My Policy", path: "/my-policy", icon: FileText },
        ],
      },
      { icon: AlertTriangle, label: "Claims", path: "/claims" },
    ],
    corporate_employee: [
      { icon: FileText, label: "Policies", path: "/my-policy" },
      { icon: AlertTriangle, label: "Claims", path: "/claims" },
      { icon: Edit, label: "Endorsements", path: "/endorsements" },
      { icon: Users, label: "Dependents", path: "/dependents" },
    ],
    hr_admin: [
      { icon: Users, label: "Employees", path: "/employees" },
      { icon: FileText, label: "Policies", path: "/my-policy" },
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
      { icon: FileText, label: "Policies", path: "/my-policy" },
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
  const [accordionOpen, setAccordionOpen] = useState([]);
  const isMobile = useIsMobile();
  // Detect initial mode from body attribute or default to light
  const { mode, toggleMode } = useTheme();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.body.getAttribute("data-theme") === "dark";
    }
    return false;
  });
  const userMenuRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Set theme on mount and whenever darkMode changes
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  // Ensure accordionOpen is always the right length
  React.useEffect(() => {
    setAccordionOpen((prev) =>
      navItems.length === prev.length
        ? prev
        : Array(navItems.length).fill(false)
    );
  }, [navItems.length]);

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
          <span className={styles["layout-navbar__brand-title"]}>Trovity</span>
        </div>
        {/* Hamburger for mobile/tablet */}

        <div className={styles["layout-navbar__nav"]}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            if (item.label === "Policy" && item.dropdown) {
              return (
                <div
                  key={item.label}
                  className={styles["layout-navbar__dropdown"]}
                  tabIndex={0}
                >
                  <button
                    className={[
                      styles["layout-navbar__nav-link"],
                      active ? styles["layout-navbar__nav-link--active"] : "",
                    ].join(" ")}
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    <Icon className={styles["layout-navbar__nav-link-icon"]} />
                    <span className="hidden sm:inline-block">{item.label}</span>
                    <svg
                      className={styles["layout-navbar__nav-link-chevron"]}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={styles["layout-navbar__dropdown-menu"]}
                    style={{ borderColor: SUBMENU_BORDER }}
                  >
                    {/* Buy Policy with nested submenu */}
                    <div
                      className={[
                        styles["layout-navbar__dropdown-item"],
                        styles["layout-navbar__dropdown-item--has-submenu"],
                        "group/submenu",
                      ].join(" ")}
                    >
                      <ShoppingBag
                        className={styles["layout-navbar__dropdown-icon"]}
                      />
                      Buy Policy
                      <svg
                        className={styles["layout-navbar__dropdown-chevron"]}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <div
                        className={
                          styles["layout-navbar__dropdown-submenu"] +
                          " group-hover/submenu:block hidden"
                        }
                        style={{ borderColor: SUBMENU_BORDER }}
                      >
                        <Link
                          to="/buy-policy/health"
                          className={
                            styles["layout-navbar__dropdown-item"] +
                            " rounded-t-xl flex items-center gap-2"
                          }
                        >
                          <HeartPulse
                            className={styles["layout-navbar__dropdown-icon"]}
                          />
                          Health Insurance
                        </Link>
                        <div
                          className={styles["layout-navbar__dropdown-divider"]}
                        />
                        <Link
                          to="/buy-policy/two-wheeler"
                          className={
                            styles["layout-navbar__dropdown-item"] +
                            " flex items-center gap-2"
                          }
                        >
                          <Bike
                            className={styles["layout-navbar__dropdown-icon"]}
                          />
                          Two Wheeler Insurance
                        </Link>
                        <div
                          className={styles["layout-navbar__dropdown-divider"]}
                        />
                        <Link
                          to="/buy-policy/four-wheeler"
                          className={
                            styles["layout-navbar__dropdown-item"] +
                            " rounded-b-xl flex items-center gap-2"
                          }
                        >
                          <Car
                            className={styles["layout-navbar__dropdown-icon"]}
                          />
                          Four Wheeler Insurance
                        </Link>
                      </div>
                    </div>
                    <div
                      className={styles["layout-navbar__dropdown-divider"]}
                    />
                    <Link
                      to="/my-policy"
                      className={
                        styles["layout-navbar__dropdown-item"] +
                        " rounded-b-xl flex items-center gap-2"
                      }
                    >
                      <FileText
                        className={styles["layout-navbar__dropdown-icon"]}
                      />
                      My Policy
                    </Link>
                  </div>
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
                style={{ fontFamily: "Roboto, sans-serif" }}
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
                  onClick={() => setUserMenuOpen(false)}
                >
                  <LogOut className={styles["layout-navbar__dropdown-icon"]} />
                  Sign out
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
        <main className="min-h-[calc(100vh-64px)] overflow-x-hidden overflow-y-auto bg-white">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
