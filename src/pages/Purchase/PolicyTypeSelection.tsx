import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Shield,
  Bike,
  Car,
  Home,
  Plane,
  Briefcase,
  Users,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../components/UI/carousel";
import { useState, useEffect } from "react";

interface PolicyTypeOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  route: string;
  features: string[];
  startingPrice: string;
}

const PolicyTypeSelection: React.FC = () => {
  const navigate = useNavigate();

  const policyTypes: PolicyTypeOption[] = [
    {
      id: "health-insurance",
      name: "Health Insurance",
      description: "Comprehensive health coverage for you and your family",
      icon: Heart,
      route: "/buy-policy/health-insurance",
      features: [
        "Cashless Treatment",
        "Pre & Post Hospitalization",
        "Annual Health Checkup",
        "Emergency Coverage",
      ],
      startingPrice: "₹8,000",
    },
    {
      id: "life-insurance",
      name: "Life Insurance",
      description: "Financial security for your loved ones",
      icon: Shield,
      route: "/buy-policy/life-insurance",
      features: [
        "Life Cover",
        "Accidental Death Benefit",
        "Tax Benefits",
        "Flexible Premiums",
      ],
      startingPrice: "₹5,000",
    },
    {
      id: "two-wheeler-insurance",
      name: "Two Wheeler Insurance",
      description: "Complete protection for your bike or scooter",
      icon: Bike,
      route: "/buy-policy/two-wheeler-insurance",
      features: [
        "Own Damage Cover",
        "Third Party Liability",
        "Personal Accident",
        "Roadside Assistance",
      ],
      startingPrice: "₹2,500",
    },
    {
      id: "motor-insurance",
      name: "Motor Insurance",
      description: "Comprehensive coverage for your car",
      icon: Car,
      route: "/buy-policy/motor-insurance",
      features: [
        "Comprehensive Coverage",
        "Zero Depreciation",
        "Engine Protection",
        "NCB Protection",
      ],
      startingPrice: "₹12,000",
    },
    {
      id: "home-insurance",
      name: "Home Insurance",
      description: "Protect your home and belongings",
      icon: Home,
      route: "/buy-policy/home-insurance",
      features: [
        "Structure Coverage",
        "Contents Protection",
        "Liability Cover",
        "Temporary Accommodation",
      ],
      startingPrice: "₹3,500",
    },
    {
      id: "travel-insurance",
      name: "Travel Insurance",
      description: "Safe travels with comprehensive coverage",
      icon: Plane,
      route: "/buy-policy/travel-insurance",
      features: [
        "Medical Emergency",
        "Trip Cancellation",
        "Baggage Loss",
        "Flight Delay",
      ],
      startingPrice: "₹500",
    },
    {
      id: "business-insurance",
      name: "Business Insurance",
      description: "Comprehensive protection for your business",
      icon: Briefcase,
      route: "/buy-policy/business-insurance",
      features: [
        "Property Coverage",
        "Liability Protection",
        "Business Interruption",
        "Cyber Security",
      ],
      startingPrice: "₹15,000",
    },
    {
      id: "group-insurance",
      name: "Group Insurance",
      description: "Employee benefits and group coverage",
      icon: Users,
      route: "/buy-policy/group-insurance",
      features: [
        "Employee Health",
        "Group Life",
        "Accidental Coverage",
        "Flexible Benefits",
      ],
      startingPrice: "₹25,000",
    },
  ];

  const handlePolicySelect = (policyType: PolicyTypeOption) => {
    navigate(policyType.route);
  };

  return (
    <div
      className="min-h-screen py-12"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Branding Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex-1 text-center md:text-left">
            <h2
              className="font-extrabold font-poppins mb-2"
              style={{
                fontSize: 36,
                color: "var(--color-primary)",
                letterSpacing: 2,
              }}
            >
              OOO
            </h2>
            <p
              className="text-base font-roboto mb-2 max-w-md"
              style={{ color: "var(--color-muted)" }}
            >
              India’s most trusted insurance platform. Protecting lives, assets,
              and dreams with innovative, customer-first solutions and expert
              guidance.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/ooo-logo.png"
              alt="OOO Insurance Logo"
              style={{
                width: 140,
                height: 140,
                objectFit: "contain",
                borderRadius: 32,
                boxShadow: "0 8px 32px 0 rgba(185,34,80,0.10)",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://svgshare.com/i/13uG.svg";
              }}
            />
          </div>
        </div>
        <ExpertCarousel />
        <div className="text-center mb-16 mt-16">
          <div className="flex items-center justify-center mb-4">
            <div
              className="p-2 rounded-2xl bg-gradient-to-br shadow-lg"
              style={{
                background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
              }}
            >
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1
            className="text-2xl font-bold font-poppins mb-3 bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, var(--color-foreground), var(--color-primary))`,
            }}
          >
            Choose Your Insurance
          </h1>

          <p
            className="text-sm font-roboto max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            Select the type of insurance that best fits your needs. Our
            comprehensive coverage options provide peace of mind and financial
            security.
          </p>
        </div>

        {/* Policy Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16 mb-16">
          {policyTypes.map((policyType) => {
            const Icon = policyType.icon;

            return (
              <div
                key={policyType.id}
                onClick={() => handlePolicySelect(policyType)}
                className="group cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                {/* Header with Icon */}
                <div className="p-3 text-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-5"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                    }}
                  ></div>
                  <div className="relative z-10">
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <h3
                      className="text-base font-bold font-poppins mb-1"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {policyType.name}
                    </h3>
                    <p
                      className="text-xs font-roboto leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {policyType.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="px-4 pb-2">
                  <div className="space-y-1">
                    {policyType.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-xs">
                        <div
                          className="w-1 h-1 rounded-full mr-2"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        ></div>
                        <span
                          className="font-roboto"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Starting from
                      </span>
                      <div
                        className="text-sm font-bold font-poppins"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {policyType.startingPrice}
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full py-2 px-3 rounded-lg font-semibold font-roboto text-white text-sm transition-all duration-300 group-hover:scale-105"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    Get Quote
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent group-hover:from-black/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Section */}
        <div className="mb-16 mt-16">
          <div className="mb-6 text-center">
            <h2
              className="text-2xl font-bold font-poppins bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
              }}
            >
              Testimonials
            </h2>
          </div>
          <TestimonialCarousel />
        </div>

        {/* Additional Information */}
        <div className="mt-20 text-center">
          <div
            className="rounded-2xl shadow-lg p-5"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <h2
              className="text-lg font-bold font-poppins mb-2"
              style={{ color: "var(--color-foreground)" }}
            >
              Why Choose Our Insurance?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center w-8 h-8 rounded-xl mb-2"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <Shield
                    className="h-4 w-4"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <h3
                  className="font-semibold font-poppins mb-1 text-sm"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Comprehensive Coverage
                </h3>
                <p
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  Wide range of coverage options tailored to your specific needs
                </p>
              </div>
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center w-8 h-8 rounded-xl mb-2"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <Users
                    className="h-4 w-4"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <h3
                  className="font-semibold font-poppins mb-1 text-sm"
                  style={{ color: "var(--color-foreground)" }}
                >
                  24/7 Support
                </h3>
                <p
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  Round-the-clock customer support for all your insurance needs
                </p>
              </div>
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center w-8 h-8 rounded-xl mb-2"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <Heart
                    className="h-4 w-4"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <h3
                  className="font-semibold font-poppins mb-1 text-sm"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Quick Claims
                </h3>
                <p
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  Fast and hassle-free claim settlement process
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Expert Carousel with autoplay and no hover effects
function ExpertCarousel() {
  const expertSlides = [
    {
      type: "agent",
      content: (
        <div className="w-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl shadow-lg p-6 flex flex-col justify-between text-white relative">
          <div>
            <h3 className="font-bold text-lg mb-2">Talk to our Agent</h3>
            <p className="text-sm mb-4 opacity-90">
              Get personalized advice and answers from our insurance experts.
              We’re here to help you choose the best plan for your needs.
            </p>
          </div>
          <button
            className="mt-2 py-2 px-6 rounded-lg font-semibold bg-white text-[var(--color-primary)] hover:bg-gray-100 transition-colors text-sm shadow"
            style={{ alignSelf: "flex-start" }}
          >
            Talk to expert
          </button>
          <img
            src="/agent-illustration.svg"
            alt="Agent"
            style={{
              position: "absolute",
              right: 12,
              bottom: 12,
              width: 60,
              opacity: 0.18,
              pointerEvents: "none",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ),
    },
    ...[
      {
        name: "Priya Sharma",
        title: "Senior Advisor",
        img: "/expert1.png",
        tagline: "15+ years in health & life insurance",
      },
      {
        name: "Rahul Mehta",
        title: "Claims Specialist",
        img: "/expert2.png",
        tagline: "Expert in quick, hassle-free claims",
      },
      {
        name: "Ayesha Khan",
        title: "Motor Insurance Guru",
        img: "/expert3.png",
        tagline: "Car & bike insurance made simple",
      },
    ].map((expert) => ({
      type: "expert",
      content: (
        <div className="w-full bg-[var(--color-card)] rounded-2xl shadow p-5 flex flex-col items-center text-center">
          <img
            src={expert.img}
            alt={expert.name}
            className="w-20 h-20 rounded-full mb-3 object-cover border-4 border-[var(--color-primary)]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://randomuser.me/api/portraits/lego/1.jpg";
            }}
          />
          <h4
            className="font-bold text-base mb-1"
            style={{ color: "var(--color-primary)" }}
          >
            {expert.name}
          </h4>
          <div
            className="text-xs font-semibold mb-1"
            style={{ color: "var(--color-muted)" }}
          >
            {expert.title}
          </div>
          <div
            className="text-xs mb-2"
            style={{ color: "var(--color-foreground)" }}
          >
            {expert.tagline}
          </div>
          <button className="mt-1 py-1 px-4 rounded font-semibold border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors text-xs">
            Talk to expert
          </button>
        </div>
      ),
    })),
  ];

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % expertSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [expertSlides.length]);

  return (
    <Carousel className="relative">
      <CarouselContent>
        {expertSlides.map((slide, idx) => (
          <CarouselItem key={idx} className={idx === current ? "" : "hidden"}>
            {slide.content}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-2 mt-4">
        {expertSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              idx === current
                ? "bg-[var(--color-primary)] scale-110"
                : "bg-[var(--color-muted)] opacity-60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
}

// Testimonial Carousel with autoplay and no hover effects
function TestimonialCarousel() {
  const testimonials = [
    {
      name: "Siddharth Jain",
      img: "/testimonial1.png",
      quote:
        "OOO made buying insurance so easy and transparent. The agent explained everything clearly and helped me get the best deal!",
      rating: 5,
    },
    {
      name: "Meera Patel",
      img: "/testimonial2.png",
      quote:
        "The claims process was super fast and hassle-free. Highly recommend OOO for their customer-first approach!",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      img: "/testimonial3.png",
      quote:
        "Expert advice, great support, and a wide range of policies. OOO is my go-to for all insurance needs.",
      rating: 4,
    },
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <Carousel className="relative">
      <CarouselContent>
        {testimonials.map((testimonial, idx) => (
          <CarouselItem key={idx} className={idx === current ? "" : "hidden"}>
            <div className="w-full bg-[var(--color-card)] rounded-2xl shadow p-6 flex flex-col items-center text-center border border-[var(--color-border)]">
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-[var(--color-primary)]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://randomuser.me/api/portraits/lego/2.jpg";
                }}
              />
              <div className="flex gap-0.5 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span
                    key={i}
                    style={{ color: "var(--color-primary)", fontSize: 18 }}
                  >
                    ★
                  </span>
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <span
                    key={i}
                    style={{ color: "var(--color-muted)", fontSize: 18 }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div
                className="text-xs mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                “{testimonial.quote}”
              </div>
              <div
                className="font-bold text-sm"
                style={{ color: "var(--color-primary)" }}
              >
                {testimonial.name}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              idx === current
                ? "bg-[var(--color-primary)] scale-110"
                : "bg-[var(--color-muted)] opacity-60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
}

export default PolicyTypeSelection;
