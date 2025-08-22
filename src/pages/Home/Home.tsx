import React, { useState } from "react";
import {
  Shield,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Star,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  TrendingUp,
  Clock,
  Heart,
  Car,
  Quote,
  ArrowRight,
  Globe,
  Sparkles,
  Briefcase,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/UI/carousel";

const Home = ({ onLogin }: { onLogin: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [carouselApi, setCarouselApi] = useState(null);

  // Auto-scroll functionality with useEffect
  React.useEffect(() => {
    if (!carouselApi) return;

    let autoplayId;
    let isHovered = false;

    const autoplay = () => {
      if (!isHovered) {
        carouselApi.scrollNext();
      }
    };

    const startAutoplay = () => {
      autoplayId = setInterval(autoplay, 3000);
    };

    const stopAutoplay = () => {
      clearInterval(autoplayId);
    };

    // Start autoplay
    startAutoplay();

    // Get carousel container for hover events
    const carouselContainer = document.querySelector(
      "[data-carousel-container]"
    );

    if (carouselContainer) {
      const handleMouseEnter = () => {
        isHovered = true;
      };

      const handleMouseLeave = () => {
        isHovered = false;
      };

      carouselContainer.addEventListener("mouseenter", handleMouseEnter);
      carouselContainer.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        stopAutoplay();
        carouselContainer.removeEventListener("mouseenter", handleMouseEnter);
        carouselContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => {
      stopAutoplay();
    };
  }, [carouselApi]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle section changes
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  // Enhanced scroll listener to detect active section
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "products", "about", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 200; // Increased offset for better detection

      // Find the current section
      let currentSection = "home"; // Default to home

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);

        if (element) {
          const offsetTop = element.offsetTop;

          if (scrollPosition >= offsetTop) {
            currentSection = sectionId;
            break;
          }
        }
      }

      // Only update if the section has changed
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [activeSection]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Navigation */}
      <nav
        className="backdrop-blur-md shadow-lg sticky top-0 z-50 border-b"
        style={{
          backgroundColor: "var(--color-navbar)",
          borderColor: "var(--color-navbar-divider)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Shield
                  className="w-5 h-5"
                  style={{ color: "var(--color-primary-foreground)" }}
                />
              </div>
              <span
                className="text-xl font-bold"
                style={{ color: "var(--color-navbar-text)" }}
              >
                PaisaPlan
              </span>
            </div>

            {/* Desktop Navigation - Enhanced */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", id: "home" },
                { name: "Products", id: "products" },
                { name: "About", id: "about" },
                { name: "Reviews", id: "testimonials" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionChange(item.id);
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="font-medium transition-all duration-300 hover:opacity-80 relative px-3 py-2"
                  style={{
                    color: "var(--color-navbar-text)",
                  }}
                >
                  {item.name}
                  {/* Underline for Active Section */}
                  {activeSection === item.id && (
                    <div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-300"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    ></div>
                  )}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="px-4 py-2 font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: "var(--color-navbar-text)" }}
                onClick={onLogin}
              >
                Login
              </button>
              <button
                className="px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-primary-foreground)",
                }}
              >
                Register
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="transition-colors duration-200 hover:opacity-80"
                style={{ color: "var(--color-navbar-text)" }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Enhanced */}
          {isMenuOpen && (
            <div
              className="md:hidden backdrop-blur-md border-t py-4"
              style={{
                backgroundColor: "var(--color-navbar-submenu-bg)",
                borderColor: "var(--color-navbar-divider)",
              }}
            >
              <div className="flex flex-col space-y-3">
                {[
                  { name: "Home", id: "home" },
                  { name: "Products", id: "products" },
                  { name: "About", id: "about" },
                  { name: "Reviews", id: "testimonials" },
                  { name: "Contact", id: "contact" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionChange(item.id);
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        document.getElementById(item.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }, 100);
                    }}
                    className="font-medium px-4 py-3 mx-3 transition-all duration-200 hover:opacity-80 relative"
                    style={{
                      color: "var(--color-navbar-submenu-text)",
                    }}
                  >
                    {item.name}
                    {/* Bottom Underline for Mobile Active Section */}
                    {activeSection === item.id && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      ></div>
                    )}
                  </a>
                ))}
                <div className="flex space-x-3 px-4 pt-2">
                  <button
                    className="flex-1 px-4 py-2 font-medium transition-colors duration-200 rounded-lg border"
                    style={{
                      color: "var(--color-navbar-submenu-text)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-primary-foreground)",
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden py-16 lg:py-20"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10"></div>
        <div style={{ backgroundColor: "var(--color-accent)" }}></div>
        <div style={{ backgroundColor: "var(--color-secondary)" }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-secondary-foreground)",
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                India's Most Trusted Insurance Platform
              </div>

              <h1
                className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
                style={{ color: "var(--color-foreground)" }}
              >
                <span
                  style={{
                    color: "var(--color-primary)",
                    filter: "drop-shadow(0 0 8px rgba(185, 34, 80, 0.2))",
                  }}
                >
                  Secure
                </span>{" "}
                Your Future with
                <span style={{ color: "var(--color-primary)" }}> Smart </span>
                <span
                  style={{
                    color: "var(--color-primary)",
                  }}
                >
                  Insurance
                </span>
              </h1>

              <p
                className="text-xl mb-8 leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                Comprehensive insurance solutions tailored for modern India.
                Protect what matters most with AI-powered recommendations and
                instant policy activation.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: "var(--color-primary)" }}
                  >
                    10M+
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Happy Customers
                  </div>
                </div>
                <div>
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ₹50Cr+
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Claims Settled
                  </div>
                </div>
                <div>
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: "var(--color-primary)" }}
                  >
                    99.2%
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Success Rate
                  </div>
                </div>
              </div>
            </div>
            {/* Hero Card */}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="py-16"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground)" }}
            >
              Our{" "}
              <span style={{ color: "var(--color-primary)" }}>
                Insurance Products
              </span>
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ color: "var(--color-muted)" }}
            >
              Comprehensive coverage options designed to protect what matters
              most to you and your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Health Insurance",
                description:
                  "Medical coverage with cashless treatment at 10,000+ hospitals.",
                features: [
                  "Family Floater Plans",
                  "Cashless Treatment",
                  "Annual Health Checkup",
                ],
                startingPrice: "₹3,999",
                color: "var(--color-danger)",
                bgGradient:
                  "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))",
                isPopular: true,
                savings: "Save ₹25K",
                coverage: "₹10L",
              },
              {
                icon: Car,
                title: "Two Wheeler",
                description:
                  "Complete bike protection with instant policy issuance.",
                features: [
                  "Third Party Coverage",
                  "Own Damage Protection",
                  "Zero Depreciation",
                ],
                startingPrice: "₹1,299",
                color: "var(--color-accent)",
                bgGradient:
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))",
                isPopular: false,
                savings: "Save ₹5K",
                coverage: "₹1L",
              },
              {
                icon: Car,
                title: "Four Wheeler",
                description:
                  "Car insurance with roadside assistance nationwide.",
                features: [
                  "Comprehensive Coverage",
                  "Roadside Assistance",
                  "Engine Protection",
                ],
                startingPrice: "₹4,999",
                color: "var(--color-success)",
                bgGradient:
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))",
                isPopular: false,
                savings: "Save ₹15K",
                coverage: "₹5L",
              },
              {
                icon: Shield,
                title: "Life Insurance",
                description:
                  "Secure your family's future with term and investment plans.",
                features: [
                  "Term Life Plans",
                  "Tax Benefits",
                  "Flexible Premium",
                ],
                startingPrice: "₹799",
                color: "var(--color-warning)",
                bgGradient:
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))",
                isPopular: false,
                savings: "Save ₹50K",
                coverage: "₹1Cr",
              },
            ].map((product, index) => (
              <div key={index} className="relative">
                {/* Floating Popular Badge - No Layout Impact */}
                {product.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div
                      className="px-4 py-2 rounded-xl text-sm font-bold shadow-xl border-2 animate-bounce"
                      style={{
                        backgroundColor: "var(--color-success)",
                        color: "white",
                        borderColor: "white",
                        boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
                      }}
                    >
                      <span className="flex items-center font-extrabold whitespace-nowrap">
                        <Sparkles className="w-4 h-4 mr-1" />
                        MOST POPULAR
                      </span>
                    </div>
                  </div>
                )}

                <div
                  className={`group relative rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                    product.isPopular
                      ? "hover:scale-110 shadow-xl hover:shadow-2xl"
                      : "hover:shadow-lg"
                  }`}
                  style={{
                    backgroundColor: "var(--color-card)",
                    borderColor: product.isPopular
                      ? product.color
                      : "var(--color-border)",
                    background: `${product.bgGradient}, linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98))`,
                    boxShadow: product.isPopular
                      ? `0 15px 30px rgba(239, 68, 68, 0.2), 0 0 0 1px ${product.color}`
                      : "0 4px 15px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  {/* Animated Background for All Cards */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-20"
                    style={{
                      background: `conic-gradient(from 0deg, ${product.color}, transparent, ${product.color})`,
                      animation: `spin ${8 + index * 2}s linear infinite`,
                    }}
                  ></div>

                  <div className="relative z-10 h-full flex flex-col p-4">
                    {/* Top Stats */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="px-2 py-1 rounded-md text-xs font-bold"
                        style={{
                          backgroundColor: `${product.color}15`,
                          color: product.color,
                        }}
                      >
                        {product.savings}
                      </div>
                      <div
                        className="px-2 py-1 rounded-md text-xs font-bold"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-muted)",
                        }}
                      >
                        {product.coverage}
                      </div>
                    </div>

                    {/* Icon and Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          product.isPopular
                            ? "group-hover:scale-110 group-hover:rotate-6"
                            : "group-hover:scale-105"
                        }`}
                        style={{
                          backgroundColor: product.color,
                          boxShadow: product.isPopular
                            ? `0 8px 20px rgba(239, 68, 68, 0.4)`
                            : `0 4px 12px ${product.color}30`,
                        }}
                      >
                        <product.icon
                          className="w-6 h-6"
                          style={{
                            color:
                              product.color === "var(--color-warning)"
                                ? "white"
                                : "var(--color-primary-foreground)",
                          }}
                        />
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            product.isPopular
                              ? "bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
                              : ""
                          }`}
                          style={{
                            color: !product.isPopular
                              ? product.color
                              : undefined,
                          }}
                        >
                          {product.startingPrice}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "var(--color-muted)" }}
                        >
                          per year
                        </div>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {product.title}
                    </h3>

                    <p
                      className="text-sm mb-4 leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {product.description}
                    </p>

                    {/* Compact Features */}
                    <div className="mb-4 flex-grow">
                      <ul className="space-y-2">
                        {product.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-sm"
                          >
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                              style={{ backgroundColor: product.color }}
                            >
                              <CheckCircle
                                className="w-2.5 h-2.5"
                                style={{
                                  color:
                                    product.color === "var(--color-warning)"
                                      ? "white"
                                      : "var(--color-primary-foreground)",
                                }}
                              />
                            </div>
                            <span
                              className="font-medium"
                              style={{ color: "var(--color-foreground)" }}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button
                      className="group w-full py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center relative overflow-hidden"
                      style={{
                        backgroundColor: product.color,
                        color:
                          product.color === "var(--color-warning)"
                            ? "white"
                            : "var(--color-primary-foreground)",
                      }}
                    >
                      <span className="relative z-10 flex items-center">
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
                    </button>

                    {/* Trust Indicator */}
                    <div className="flex items-center justify-center mt-3 text-xs">
                      <div
                        className="w-1.5 h-1.5 rounded-full mr-2 animate-pulse"
                        style={{ backgroundColor: "var(--color-success)" }}
                      ></div>
                      <span style={{ color: "var(--color-muted)" }}>
                        {product.isPopular
                          ? "10K+ Hospitals"
                          : "Instant Approval"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground)" }}
            >
              Why Choose{" "}
              <span style={{ color: "var(--color-primary)" }}>PaisaPlan</span>
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ color: "var(--color-muted)" }}
            >
              We're revolutionizing insurance in India with technology-driven
              solutions, transparent pricing, and customer-first approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Shield,
                title: "100% Secure",
                desc: "Bank-grade security with 256-bit encryption. Your data is protected with the highest security standards.",
                color: "var(--color-primary)",
              },
              {
                icon: TrendingUp,
                title: "AI-Powered",
                desc: "Smart recommendations based on your lifestyle, age, and requirements using advanced AI algorithms.",
                color: "var(--color-accent)",
              },
              {
                icon: Clock,
                title: "Instant Claims",
                desc: "24/7 claim support with instant processing. Most claims settled within 24 hours of submission.",
                color: "var(--color-success)",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon
                    className="w-7 h-7"
                    style={{
                      color:
                        feature.color === "var(--color-success)"
                          ? "white"
                          : "var(--color-primary-foreground)",
                    }}
                  />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "var(--color-muted)" }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Company Stats */}
          <div
            className="rounded-2xl p-10 text-center"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "15+", label: "Years Experience" },
                { value: "50+", label: "Insurance Partners" },
                { value: "500+", label: "Cities Covered" },
                { value: "24/7", label: "Customer Support" },
              ].map((stat, index) => (
                <div key={index}>
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{ color: "var(--color-primary-foreground)" }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: "var(--color-secondary)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground)" }}
            >
              Meet Our Founders
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ color: "var(--color-muted)" }}
            >
              Visionary leaders with decades of experience in insurance,
              technology, and financial services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "efg",
                role: "CEO & Co-Founder",
                desc: "Former VP at HDFC Life with 20+ years in insurance. IIT Delhi alumnus passionate about democratizing insurance access.",
                icon: Users,
                color: "var(--color-primary)",
              },
              {
                name: "xyz",
                role: "CTO & Co-Founder",
                desc: "Ex-Google engineer with expertise in AI/ML. MIT graduate leading our technology innovation and digital transformation.",
                icon: Briefcase,
                color: "var(--color-accent)",
              },
              {
                name: "abc",
                role: "COO & Co-Founder",
                desc: "Former McKinsey consultant with 15+ years in strategy. IIM Ahmedabad graduate driving operational excellence.",
                icon: Award,
                color: "var(--color-warning)",
              },
            ].map((founder, index) => (
              <div
                key={index}
                className="group rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                <div className="relative">
                  <div
                    className="w-full h-56 flex items-center justify-center"
                    style={{ backgroundColor: founder.color }}
                  >
                    <founder.icon
                      className="w-20 h-20 opacity-80"
                      style={{
                        color:
                          founder.color === "var(--color-warning)"
                            ? "white"
                            : "var(--color-primary-foreground)",
                      }}
                    />
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {founder.name}
                  </h3>
                  <p
                    className="font-medium mb-3"
                    style={{ color: founder.color }}
                  >
                    {founder.role}
                  </p>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {founder.desc}
                  </p>
                  <div className="flex space-x-3">
                    <Linkedin
                      className="w-5 h-5 cursor-pointer transition-colors duration-200 hover:opacity-70"
                      style={{ color: founder.color }}
                    />
                    <Twitter
                      className="w-5 h-5 cursor-pointer transition-colors duration-200 hover:opacity-70"
                      style={{ color: founder.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced with Auto-scroll Carousel */}
      <section
        id="testimonials"
        className="py-16"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground)" }}
            >
              What Our Customers Say
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ color: "var(--color-muted)" }}
            >
              Over 10 million satisfied customers trust PaisaPlan for their
              insurance needs. Here's what they have to say about us.
            </p>
          </div>

          {/* Auto-scroll Carousel without Navigation */}
          <div className="relative max-w-6xl mx-auto" data-carousel-container>
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {[
                  {
                    text: "PaisaPlan made buying health insurance so simple! The AI recommendations were spot-on, and the claim process was incredibly smooth. Got my claim settled in just 2 days.",
                    name: "Ankit Sharma",
                    role: "Software Engineer",
                    location: "Bangalore",
                    rating: 5,
                    color: "var(--color-primary)",
                  },
                  {
                    text: "Best insurance platform I've used! The comparison feature helped me save ₹15,000 annually. Customer service is outstanding - available 24/7 and super responsive.",
                    name: "Riya Gupta",
                    role: "Marketing Manager",
                    location: "Mumbai",
                    rating: 5,
                    color: "var(--color-success)",
                  },
                  {
                    text: "Claim settlement was faster than promised! Got my motor insurance claim settled in just 18 hours. Transparent pricing and no hidden charges. Amazing experience!",
                    name: "Manoj Kumar",
                    role: "Business Owner",
                    location: "Delhi",
                    rating: 5,
                    color: "var(--color-warning)",
                  },
                  {
                    text: "The family health plan from PaisaPlan covers my entire family of 4 at an amazing price. The cashless treatment feature worked perfectly when my father was hospitalized.",
                    name: "Priya Verma",
                    role: "Teacher",
                    location: "Pune",
                    rating: 5,
                    color: "var(--color-accent)",
                  },
                  {
                    text: "Bought term life insurance through PaisaPlan. The process was completely digital and hassle-free. Great customer support helped me understand all policy details clearly.",
                    name: "Rahul Singh",
                    role: "Financial Analyst",
                    location: "Gurgaon",
                    rating: 5,
                    color: "var(--color-danger)",
                  },
                  {
                    text: "Travel insurance from PaisaPlan saved my Europe trip! When my flight got cancelled, they processed my claim within 24 hours. Excellent service and quick response.",
                    name: "Sneha Patel",
                    role: "Consultant",
                    location: "Ahmedabad",
                    rating: 5,
                    color: "var(--color-success)",
                  },
                  {
                    text: "The whole family is covered under one comprehensive policy. The premium calculator was accurate and the policy terms are crystal clear. Great value for money!",
                    name: "Vikram Singh",
                    role: "Government Employee",
                    location: "Jaipur",
                    rating: 5,
                    color: "var(--color-primary)",
                  },
                  {
                    text: "Seamless experience from quote to policy issuance. The mobile app is user-friendly and claim tracking is real-time. Highly recommend for young professionals.",
                    name: "Kavya Nair",
                    role: "Designer",
                    location: "Kochi",
                    rating: 5,
                    color: "var(--color-accent)",
                  },
                ].map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className="group rounded-2xl p-6 h-full transition-all duration-500 transform  border relative overflow-hidden cursor-pointer"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      {/* Background Pattern */}
                      <div
                        className="absolute top-0 right-0 w-20 h-20 opacity-5"
                        style={{
                          background: `radial-gradient(circle, ${testimonial.color} 30%, transparent 70%)`,
                        }}
                      ></div>

                      {/* Header with Quote Icon and Rating */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: testimonial.color }}
                        >
                          <Quote
                            className="w-5 h-5"
                            style={{
                              color:
                                testimonial.color === "var(--color-warning)"
                                  ? "white"
                                  : "var(--color-primary-foreground)",
                            }}
                          />
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-current"
                              style={{ color: "var(--color-warning)" }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p
                        className="mb-6 italic leading-relaxed"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        "{testimonial.text}"
                      </p>

                      {/* Customer Info */}
                      <div className="flex items-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: testimonial.color }}
                        >
                          <span
                            className="font-bold text-sm"
                            style={{
                              color:
                                testimonial.color === "var(--color-warning)"
                                  ? "white"
                                  : "var(--color-primary-foreground)",
                            }}
                          >
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div
                            className="font-semibold"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {testimonial.name}
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: "var(--color-muted)" }}
                          >
                            {testimonial.role}
                          </div>
                          <div
                            className="text-sm flex items-center mt-1"
                            style={{ color: testimonial.color }}
                          >
                            <MapPin className="w-3 h-3 mr-1" />
                            {testimonial.location}
                          </div>
                        </div>
                      </div>

                      {/* Hover Indicator */}
                      <div
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: "var(--color-muted)" }}
                      ></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Navigation arrows removed */}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        style={{
          backgroundColor: "var(--color-foreground)",
          color: "var(--color-card)",
          padding: "2rem 0",
        }}
      >
        {/* Trust Badges */}
        <div className="text-center">
          <p className="mb-6" style={{ color: "var(--color-muted)" }}>
            Trusted by leading organizations
          </p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            {[
              {
                icon: Shield,
                text: "IRDAI Approved",
                color: "var(--color-primary)",
              },
              {
                icon: Award,
                text: "ISO 27001",
                color: "var(--color-success)",
              },
              {
                icon: Globe,
                text: "PCI DSS",
                color: "var(--color-accent)",
              },
            ].map((badge, index) => (
              <div key={index} className="flex items-center space-x-2">
                <badge.icon
                  className="w-6 h-6"
                  style={{ color: badge.color }}
                />
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-card)" }}
                >
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-5">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Shield
                    className="w-5 h-5"
                    style={{ color: "var(--color-primary-foreground)" }}
                  />
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-card)" }}
                >
                  PaisaPlan
                </span>
              </div>
              <p style={{ color: "var(--color-muted)" }}>
                India's most trusted insurance platform, making insurance
                simple, transparent, and accessible for everyone.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                  <Icon
                    key={index}
                    className="w-6 h-6 cursor-pointer transition-colors duration-200 hover:opacity-70"
                    style={{ color: "var(--color-muted)" }}
                  />
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h3
                className="text-lg font-semibold mb-5"
                style={{ color: "var(--color-card)" }}
              >
                Products
              </h3>
              <ul className="space-y-3">
                {[
                  "Health Insurance",
                  "Motor Insurance",
                  "Home Insurance",
                  "Travel Insurance",
                  "Life Insurance",
                ].map((product) => (
                  <li key={product}>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:opacity-70"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {product}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3
                className="text-lg font-semibold mb-5"
                style={{ color: "var(--color-card)" }}
              >
                Support
              </h3>
              <ul className="space-y-3">
                {[
                  "Help Center",
                  "Claims Process",
                  "Contact Support",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:opacity-70"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3
                className="text-lg font-semibold mb-5"
                style={{ color: "var(--color-card)" }}
              >
                Contact Us
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, text: "1800-123-4567" },
                  { icon: Mail, text: "info@paisaplan.com" },
                  {
                    icon: MapPin,
                    text: "",
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <contact.icon
                      className="w-5 h-5 mt-1"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span style={{ color: "var(--color-muted)" }}>
                      {contact.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="border-t mt-10 pt-8 flex flex-col md:flex-row justify-between items-center"
            style={{ borderColor: "var(--color-border)" }}
          >
            <p style={{ color: "var(--color-muted)" }}>
              © 2024 PaisaPlan. All rights reserved. | IRDAI License: 123456789
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm transition-colors duration-200 hover:opacity-70"
                  style={{ color: "var(--color-muted)" }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
