import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HeartPulse,
  Bike,
  Car,
  User,
  LogIn,
  FileText,
  FilePlus2,
  Search,
  Shield,
  LifeBuoy,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import styles from "../Layout/Navbar/Layout.module.scss";
import KeycloakService from "../../keycloackService";

const SUBMENU_BORDER = "#e5b8d9";
const NAVBAR_HEIGHT = 72;

const healthOptions = [
  { label: "Individual Health", path: "/buy-policy/health/individual" },
  { label: "Family Floater", path: "/buy-policy/health/family" },
  { label: "Senior Citizen", path: "/buy-policy/health/senior" },
  { label: "Critical Illness", path: "/buy-policy/health/critical" },
];

const PurchaseNavbar: React.FC = () => {
  const location = useLocation();
  const [buyOpen, setBuyOpen] = useState(false);
  const [claimsOpen, setClaimsOpen] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const claimsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (buyRef.current && !buyRef.current.contains(e.target as Node)) {
        setBuyOpen(false);
      }
      if (claimsRef.current && !claimsRef.current.contains(e.target as Node)) {
        setClaimsOpen(false);
      }
    }
    if (buyOpen || claimsOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [buyOpen, claimsOpen]);

  return (
    <nav
      className={styles["layout-navbar"]}
      style={{ position: "sticky", top: 0, zIndex: 100 }}
    >
      <div className={styles["layout-navbar__brand"]}>
        <span className={styles["layout-navbar__brand-icon"]}>
          <Shield className="h-6 w-6 text-white" />
        </span>
        <span className={styles["layout-navbar__brand-title"]}>Trovity</span>
      </div>
      <div className={styles["layout-navbar__nav"]}>
        {/* Buy Insurance Dropdown */}
        <div
          className={styles["layout-navbar__dropdown"]}
          ref={buyRef}
          tabIndex={0}
          style={{ position: "relative" }}
        >
          <button
            className={styles["layout-navbar__nav-link"]}
            style={{ fontFamily: "Roboto, sans-serif" }}
            onClick={() => setBuyOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={buyOpen}
          >
            <ShoppingBag className={styles["layout-navbar__nav-link-icon"]} />
            <span className="hidden sm:inline-block">Insurances</span>
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
          {buyOpen && (
            <div
              className={styles["layout-navbar__dropdown-menu"]}
              style={{
                borderColor: SUBMENU_BORDER,
                left: 0,
                top: "100%",
                minWidth: 260,
                position: "absolute",
                display: "block",
                opacity: 1,
                transform: "translateY(0) scale(1)",
                zIndex: 100,
              }}
            >
              {/* Health Insurance Section */}
              <div style={{ padding: "0.5rem 1rem 0.25rem 1rem" }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 4,
                    color: "#6a11cb",
                  }}
                >
                  Health Insurance
                </div>
                {healthOptions.map((opt) => (
                  <Link
                    key={opt.path}
                    to={opt.path}
                    className={
                      styles["layout-navbar__dropdown-item"] +
                      " flex items-center gap-2"
                    }
                    style={{ paddingLeft: 24 }}
                    onClick={() => setBuyOpen(false)}
                  >
                    <HeartPulse
                      className={styles["layout-navbar__dropdown-icon"]}
                    />
                    {opt.label}
                  </Link>
                ))}
              </div>
              <div className={styles["layout-navbar__dropdown-divider"]} />
              <Link
                to="/buy-policy/four-wheeler"
                className={
                  styles["layout-navbar__dropdown-item"] +
                  " flex items-center gap-2"
                }
                onClick={() => setBuyOpen(false)}
              >
                <Car className={styles["layout-navbar__dropdown-icon"]} />
                Motor Insurance
              </Link>
              <div className={styles["layout-navbar__dropdown-divider"]} />
              <Link
                to="/buy-policy/two-wheeler"
                className={
                  styles["layout-navbar__dropdown-item"] +
                  " flex items-center gap-2"
                }
                onClick={() => setBuyOpen(false)}
              >
                <Bike className={styles["layout-navbar__dropdown-icon"]} />
                Two Wheeler Insurance
              </Link>
              <div className={styles["layout-navbar__dropdown-divider"]} />
              <Link
                to="/buy-policy/life"
                className={
                  styles["layout-navbar__dropdown-item"] +
                  " flex items-center gap-2"
                }
                onClick={() => setBuyOpen(false)}
              >
                <LifeBuoy className={styles["layout-navbar__dropdown-icon"]} />
                Life Insurance
              </Link>
            </div>
          )}
        </div>
        {/* Claims Dropdown */}
        <div
          className={styles["layout-navbar__dropdown"]}
          ref={claimsRef}
          tabIndex={0}
          style={{ position: "relative" }}
        >
          <button
            className={styles["layout-navbar__nav-link"]}
            style={{ fontFamily: "Roboto, sans-serif" }}
            onClick={() => setClaimsOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={claimsOpen}
          >
            <FileText className={styles["layout-navbar__nav-link-icon"]} />
            <span className="hidden sm:inline-block">Claims</span>
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
          {claimsOpen && (
            <div
              className={styles["layout-navbar__dropdown-menu"]}
              style={{
                borderColor: SUBMENU_BORDER,
                left: 0,
                top: "100%",
                minWidth: 220,
                position: "absolute",
                display: "block",
                opacity: 1,
                transform: "translateY(0) scale(1)",
                zIndex: 100,
              }}
            >
              <Link
                to="/claims/file"
                className={
                  styles["layout-navbar__dropdown-item"] +
                  " flex items-center gap-2"
                }
                onClick={() => setClaimsOpen(false)}
              >
                <FilePlus2 className={styles["layout-navbar__dropdown-icon"]} />
                File a New Claim
              </Link>
              <div className={styles["layout-navbar__dropdown-divider"]} />
              <Link
                to="/claims/status"
                className={
                  styles["layout-navbar__dropdown-item"] +
                  " flex items-center gap-2"
                }
                onClick={() => setClaimsOpen(false)}
              >
                <Search className={styles["layout-navbar__dropdown-icon"]} />
                Know Your Claim Status
              </Link>
            </div>
          )}
        </div>
        {/* Renewals */}
        <Link
          to="/renewals"
          className={styles["layout-navbar__nav-link"]}
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <RefreshCw className={styles["layout-navbar__nav-link-icon"]} />
          <span className="hidden sm:inline-block">Renewals</span>
        </Link>
      </div>
      {/* Login Button (rightmost) */}
      <div className={styles["layout-navbar__user-menu"]}>
        <Link
          to="/login"
          onClick={() => {
            KeycloakService.initKeycloak();
          }}
          className={styles["layout-navbar__user-btn"]}
          style={{
            fontWeight: 600,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "transparent",
            color: "var(--color-primary)",
            border: "1.5px solid var(--color-primary)",
            borderRadius: 10,
            padding: "6px 16px",
            boxShadow: "none",
            transition:
              "background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s",
            lineHeight: 1.2,
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(106,17,203,0.09)";
            (e.currentTarget as HTMLElement).style.color =
              "var(--color-primary)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "var(--color-primary)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 2px 8px 0 rgba(106,17,203,0.10)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color =
              "var(--color-primary)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "var(--color-primary)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <LogIn className="h-5 w-5" />
          Login
        </Link>
      </div>
    </nav>
  );
};

export default PurchaseNavbar;
