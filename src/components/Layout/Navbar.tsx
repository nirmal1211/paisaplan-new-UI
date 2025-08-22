import React, { useState, useRef } from "react";
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
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Crown,
  Zap,
  Calendar,
} from "lucide-react";
import { useTheme } from "../../theme/ThemeProvider";
import KeycloakService from "../../keycloackService";
import SubscriptionModal from "../SubscriptionModal";

interface LayoutProps {
  children: React.ReactNode;
}

// Navigation item interface
interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  dropdown?: NavItem[];
}

// Notification interface
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

// Subscription interface
interface Subscription {
  plan: "free" | "premium" | "enterprise" | null;
  status: "active" | "expired" | "trial" | "expiring_soon" | "none";
  expiryDate: Date | null;
  daysLeft: number;
  isSubscribed: boolean;
}

// Sample subscription data - for non-subscribed user
const sampleSubscription: Subscription = {
  plan: null,
  status: "none",
  expiryDate: null,
  daysLeft: 0,
  isSubscribed: false,
};

// Sample notifications
const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "Policy Renewal Due",
    message: "Your health insurance policy is due for renewal in 7 days.",
    type: "warning",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: "2",
    title: "Claim Approved",
    message: "Your recent claim for medical expenses has been approved.",
    type: "success",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: false,
  },
  {
    id: "3",
    title: "New Policy Available",
    message: "Check out our new comprehensive car insurance policy.",
    type: "info",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
  },
  {
    id: "4",
    title: "Payment Reminder",
    message: "Monthly premium payment is due tomorrow.",
    type: "warning",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    read: true,
  },
];

const getNavigationItems = (role: string) => {
  const baseItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  ];

  const roleSpecificItems: Record<string, NavItem[]> = {
    retail_customer: [
      {
        icon: ShoppingBag,
        label: "Buy Policy",
        path: "/buy-policy",
        dropdown: [
          {
            label: "Health Insurance",
            path: "/buy-policy/health-insurance",
            icon: HeartPulse,
          },
          {
            label: "Four Wheeler Insurance",
            path: "/buy-policy/four-wheeler-insurance",
            icon: Car,
          },
          {
            label: "Two Wheeler Insurance",
            path: "/buy-policy/two-wheeler-insurance",
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

const Navbar: React.FC<LayoutProps> = ({ children }) => {
  const navItems = getNavigationItems("retail_customer");
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [activeMobileDropdowns, setActiveMobileDropdowns] = useState<string[]>(
    []
  );
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const [subscription] = useState<Subscription>(sampleSubscription);
  const [subscriptionBannerDismissed, setSubscriptionBannerDismissed] =
    useState(false);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  const { mode, toggleMode } = useTheme();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Add gradient animation styles
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Get unread notifications count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Format timestamp for display
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
  };

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Get notification icon
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "warning":
        return AlertCircle;
      case "error":
        return AlertTriangle;
      default:
        return Info;
    }
  };

  // Get notification icon color
  const getNotificationIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  // Get subscription banner configuration
  const getSubscriptionBanner = () => {
    if (subscriptionBannerDismissed) return null;

    // For non-subscribed users
    if (!subscription.isSubscribed) {
      return {
        message: "Unlock premium features with our subscription plans",
        action: "Explore Plans",
        variant: "info",
        icon: Crown,
        onClick: () => setSubscriptionModalOpen(true),
      };
    }

    // For subscribed users with different statuses
    switch (subscription.status) {
      case "expiring_soon":
        return {
          message: `Your ${subscription.plan} plan expires in ${subscription.daysLeft} days`,
          action: "Renew Now",
          variant: "warning",
          icon: Calendar,
          link: "/subscription/renew",
        };
      case "expired":
        return {
          message: `Your ${subscription.plan} plan has expired`,
          action: "Reactivate Now",
          variant: "error",
          icon: AlertCircle,
          link: "/subscription/reactivate",
        };
      case "trial":
        return {
          message: `${subscription.daysLeft} days left in your free trial`,
          action: "Upgrade to Premium",
          variant: "info",
          icon: Zap,
          link: "/subscription/upgrade",
        };
      default:
        return null;
    }
  };

  const subscriptionBanner = getSubscriptionBanner();

  // Scroll to top when location changes
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  // Toggle mobile dropdown
  const toggleMobileDropdown = (itemName: string) => {
    setActiveMobileDropdowns((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

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
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setNotificationOpen(false);
      }
    }
    if (userMenuOpen || dropdownOpen || notificationOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen, dropdownOpen, notificationOpen]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Enhanced Professional Navigation Bar */}
      <nav
        className="sticky top-0 z-50 w-full border-b"
        style={{
          backgroundColor: "var(--color-background)",
          borderBottomColor: "var(--color-border)",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 8px 25px -8px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div className="mx-auto max-w-7xl ">
          <div className="flex h-20 items-center justify-between">
            {/* Left section: Brand logo and Navigation */}
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Shield
                    className="h-7 w-7"
                    style={{ color: "var(--color-primary-foreground)" }}
                  />
                </div>
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: "var(--color-primary)" }}
                >
                  Trovity
                </span>
              </div>

              {/* Enhanced Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;

                  if (item.dropdown) {
                    return (
                      <div
                        key={item.label}
                        className="relative"
                        ref={dropdownRef}
                      >
                        <button
                          onClick={() =>
                            setDropdownOpen(
                              dropdownOpen === item.label ? null : item.label
                            )
                          }
                          className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 relative group ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              dropdownOpen === item.label ? "rotate-180" : ""
                            }`}
                          />
                          {/* Enhanced center-to-corners underline effect */}
                          <span
                            className={`absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-300 ease-in-out transform -translate-x-1/2 ${
                              active
                                ? "w-full opacity-100 scale-x-100"
                                : "w-0 opacity-0 scale-x-0 group-hover:w-full group-hover:opacity-100 group-hover:scale-x-100"
                            }`}
                            style={{
                              backgroundColor: "var(--color-primary)",
                              transformOrigin: "center",
                            }}
                          ></span>
                        </button>

                        {dropdownOpen === item.label && (
                          <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black/5 border border-gray-200 focus:outline-none z-50">
                            <div className="py-1">
                              {item.dropdown?.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  to={subItem.path}
                                  onClick={() => setDropdownOpen(null)}
                                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                >
                                  <subItem.icon className="h-4 w-4 text-gray-400" />
                                  <span>{subItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 relative group ${
                        active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                      {/* Enhanced center-to-corners underline effect */}
                      <span
                        className={`absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-300 ease-in-out transform -translate-x-1/2 ${
                          active
                            ? "w-full opacity-100 scale-x-100"
                            : "w-0 opacity-0 scale-x-0 group-hover:w-full group-hover:opacity-100 group-hover:scale-x-100"
                        }`}
                        style={{
                          backgroundColor: "var(--color-primary)",
                          transformOrigin: "center",
                        }}
                      ></span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right section: Enhanced action buttons */}
            <div className="flex items-center gap-3">
              {/* Subscription CTA for non-subscribed users - Mobile Responsive */}
              {!subscription.isSubscribed && (
                <button
                  onClick={() => setSubscriptionModalOpen(true)}
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-hidden group"
                  style={{
                    background:
                      "linear-gradient(135deg, #b92250 0%, #e879f9 30%, #60a5fa 60%, #34d399 90%)",
                    backgroundSize: "300% 300%",
                    color: "white",
                    borderColor: "transparent",
                    animation: "gradientShift 3s ease infinite",
                  }}
                >
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Crown className="h-3 w-3 sm:h-4 sm:w-4 relative z-10" />
                  <span className="relative z-10 font-semibold">
                    <span className="hidden sm:inline">Get Premium</span>
                    <span className="sm:hidden">Premium</span>
                  </span>
                </button>
              )}

              {/* Modern Notification Center */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 relative"
                  style={{ color: "var(--color-foreground)" }}
                  aria-expanded={notificationOpen}
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs font-medium flex items-center justify-center text-white"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 border border-gray-200 focus:outline-none z-50">
                    {/* Notification Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    {/* Notification List */}
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((notification) => {
                          const IconComponent = getNotificationIcon(
                            notification.type
                          );
                          return (
                            <div
                              key={notification.id}
                              className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                                !notification.read ? "bg-blue-50" : ""
                              }`}
                              onClick={() => {
                                if (!notification.read) {
                                  markAsRead(notification.id);
                                }
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <IconComponent
                                  className={`h-5 w-5 mt-0.5 ${getNotificationIconColor(
                                    notification.type
                                  )}`}
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <p
                                      className={`text-sm font-medium ${
                                        !notification.read
                                          ? "text-gray-900"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <span
                                        className="h-2 w-2 rounded-full ml-2 mt-1"
                                        style={{
                                          backgroundColor:
                                            "var(--color-primary)",
                                        }}
                                      />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                    <Clock className="h-3 w-3" />
                                    <span>
                                      {formatTimestamp(notification.timestamp)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Notification Footer */}
                    {notifications.length > 0 && (
                      <div className="px-4 py-3 border-t border-gray-100">
                        <Link
                          to="/notifications"
                          onClick={() => setNotificationOpen(false)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View all notifications
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Enhanced User menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  style={{ color: "var(--color-foreground)" }}
                  aria-expanded={userMenuOpen}
                  aria-label="User menu"
                >
                  <User className="h-5 w-5" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 border border-gray-200 focus:outline-none z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          Account
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 text-gray-400" />
                        <span>Profile Settings</span>
                      </Link>

                      <button
                        onClick={() => {
                          toggleMode();
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left"
                      >
                        {mode === "dark" ? (
                          <Sun className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Moon className="h-4 w-4 text-gray-400" />
                        )}
                        <span>
                          {mode === "dark" ? "Light Mode" : "Dark Mode"}
                        </span>
                      </button>

                      {!subscription.isSubscribed && (
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            setSubscriptionModalOpen(true);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors text-left"
                          style={{ color: "var(--color-primary)" }}
                        >
                          <Crown
                            className="h-4 w-4"
                            style={{ color: "var(--color-primary)" }}
                          />
                          <span className="font-medium">
                            Upgrade to Premium
                          </span>
                        </button>
                      )}

                      <div className="border-t border-gray-100 my-1" />

                      <button
                        onClick={() => KeycloakService.doLogout()}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4 text-gray-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 lg:hidden"
                style={{ color: "var(--color-foreground)" }}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Subscription Alert Banner */}
      {subscriptionBanner && (
        <div
          className={`w-full px-4 py-3 border-b ${
            subscriptionBanner.variant === "warning"
              ? "bg-yellow-50 border-yellow-200"
              : subscriptionBanner.variant === "error"
              ? "bg-red-50 border-red-200"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <subscriptionBanner.icon
                className={`h-5 w-5 ${
                  subscriptionBanner.variant === "warning"
                    ? "text-yellow-600"
                    : subscriptionBanner.variant === "error"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              />
              <p
                className={`text-sm font-medium ${
                  subscriptionBanner.variant === "warning"
                    ? "text-yellow-800"
                    : subscriptionBanner.variant === "error"
                    ? "text-red-800"
                    : "text-blue-800"
                }`}
              >
                {subscriptionBanner.message}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {subscriptionBanner.onClick ? (
                <button
                  onClick={subscriptionBanner.onClick}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    subscriptionBanner.variant === "warning"
                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                      : subscriptionBanner.variant === "error"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {subscription.isSubscribed &&
                  (subscription.plan === "premium" ||
                    subscription.plan === "enterprise") ? (
                    <Crown className="h-4 w-4" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  {subscriptionBanner.action}
                </button>
              ) : (
                <Link
                  to={subscriptionBanner.link || "#"}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    subscriptionBanner.variant === "warning"
                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                      : subscriptionBanner.variant === "error"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {subscription.isSubscribed &&
                  (subscription.plan === "premium" ||
                    subscription.plan === "enterprise") ? (
                    <Crown className="h-4 w-4" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  {subscriptionBanner.action}
                </Link>
              )}
              <button
                onClick={() => setSubscriptionBannerDismissed(true)}
                className={`p-1 rounded-lg transition-colors ${
                  subscriptionBanner.variant === "warning"
                    ? "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100"
                    : subscriptionBanner.variant === "error"
                    ? "text-red-600 hover:text-red-800 hover:bg-red-100"
                    : "text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                }`}
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 w-full max-w-sm h-full bg-white shadow-xl">
            <div
              className="flex items-center justify-between px-6 py-6 border-b"
              style={{
                backgroundColor: "var(--color-background)",
                borderBottomColor: "var(--color-border)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Shield
                    className="h-6 w-6"
                    style={{ color: "var(--color-primary-foreground)" }}
                  />
                </div>
                <span
                  className="font-bold text-xl tracking-tight"
                  style={{ color: "var(--color-primary)" }}
                >
                  Trovity
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                style={{ color: "var(--color-foreground)" }}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                if (item.dropdown) {
                  return (
                    <div key={item.label} className="space-y-2">
                      <button
                        onClick={() => toggleMobileDropdown(item.label)}
                        className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors relative group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-gray-500" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-gray-500 transition-transform ${
                            activeMobileDropdowns.includes(item.label)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                        {/* Enhanced center-to-corners mobile underline effect */}
                        <span
                          className={`absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-300 ease-in-out transform -translate-x-1/2 ${
                            active
                              ? "w-full opacity-100 scale-x-100"
                              : "w-0 opacity-0 scale-x-0 group-hover:w-full group-hover:opacity-100 group-hover:scale-x-100"
                          }`}
                          style={{
                            backgroundColor: "var(--color-primary)",
                            transformOrigin: "center",
                          }}
                        ></span>
                      </button>

                      {activeMobileDropdowns.includes(item.label) && (
                        <div className="ml-4 space-y-1">
                          {item.dropdown?.map((child) => (
                            <Link
                              key={child.label}
                              to={child.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              style={{
                                color:
                                  location.pathname === child.path
                                    ? "var(--color-primary)"
                                    : "rgb(75 85 99)",
                              }}
                            >
                              <child.icon className="h-4 w-4 text-gray-400" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    to={item.path}
                    key={item.label}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors relative group"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      color: active ? "var(--color-primary)" : "rgb(55 65 81)",
                    }}
                  >
                    <Icon className="h-5 w-5 text-gray-500" />
                    <span>{item.label}</span>
                    {/* Enhanced center-to-corners mobile underline effect */}
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-300 ease-in-out transform -translate-x-1/2 ${
                        active
                          ? "w-full opacity-100 scale-x-100"
                          : "w-0 opacity-0 scale-x-0 group-hover:w-full group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                      style={{
                        backgroundColor: "var(--color-primary)",
                        transformOrigin: "center",
                      }}
                    ></span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile user section */}
            <div className="border-t border-gray-200 mt-4 pt-4 px-4">
              <div className="space-y-2">
                {!subscription.isSubscribed && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSubscriptionModalOpen(true);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-hidden group text-left"
                    style={{
                      background:
                        "linear-gradient(135deg, #b92250 0%, #e879f9 30%, #60a5fa 60%, #34d399 90%)",
                      backgroundSize: "300% 300%",
                      color: "white",
                      animation: "gradientShift 3s ease infinite",
                    }}
                  >
                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <Crown className="h-4 w-4 relative z-10" />
                    <span className="relative z-10 font-semibold">
                      Get Premium
                    </span>
                  </button>
                )}

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4 text-gray-500" />
                  Profile
                </Link>

                {subscription.isSubscribed && (
                  <Link
                    to="/subscription/manage"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Crown className="h-4 w-4 text-gray-500" />
                    Manage Subscription
                  </Link>
                )}

                <Link
                  to="/support"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <HelpCircle className="h-4 w-4 text-gray-500" />
                  Support
                </Link>

                <button
                  onClick={() => KeycloakService.doLogout()}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <LogOut className="h-4 w-4 text-gray-500" />
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content with proper scrolling and custom scrollbar */}
      <div
        ref={scrollContainerRef}
        className="w-full custom-scrollbar"
        style={{
          marginTop: 0,
          height: subscriptionBanner
            ? "calc(100vh - 80px - 56px)"
            : "calc(100vh - 80px)",
          overflow: "auto",
          position: "relative",
        }}
      >
        <main className="w-full bg-white min-h-full">
          <div className="bg-white min-h-full">{children}</div>
        </main>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={subscriptionModalOpen}
        onClose={() => setSubscriptionModalOpen(false)}
      />
    </div>
  );
};

export default Navbar;
