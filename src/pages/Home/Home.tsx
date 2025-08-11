import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Heart, 
  Car, 
  Bike, 
  Star, 
  Users, 
  Award, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  Play,
  CheckCircle,
  TrendingUp,
  Globe,
  Zap,
  Clock,
  FileText,
  Calculator,
  Headphones
} from 'lucide-react';

interface HomeProps {
  onLogin: () => void;
  config?: any;
}

const Home: React.FC<HomeProps> = ({ onLogin, config }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  // Animated statistics
  const [stats, setStats] = useState({
    partners: 0,
    customers: 0,
    claims: 0,
    policies: 0
  });

  useEffect(() => {
    // Animate statistics
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const partnersTarget = 25;
      const customersTarget = 15000;
      const claimsTarget = 98;
      const policiesTarget = 50000;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setStats({
          partners: Math.floor(partnersTarget * progress),
          customers: Math.floor(customersTarget * progress),
          claims: Math.floor(claimsTarget * progress),
          policies: Math.floor(policiesTarget * progress)
        });

        if (step >= steps) {
          clearInterval(interval);
          setStats({ 
            partners: partnersTarget, 
            customers: customersTarget, 
            claims: claimsTarget,
            policies: policiesTarget 
          });
        }
      }, duration / steps);
    };

    animateStats();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const partners = [
    { name: 'HDFC ERGO', logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2' },
    { name: 'ICICI Lombard', logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2' },
    { name: 'Star Health', logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2' },
    { name: 'Bajaj Allianz', logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2' },
    { name: 'Tata AIG', logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2' },
    { name: 'Max Bupa', logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&dpr=2' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Comprehensive Coverage',
      description: 'Get complete protection with our wide range of insurance products tailored to your needs.'
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      description: 'Fast claim processing and instant policy issuance with our streamlined digital platform.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need help with your policies.'
    },
    {
      icon: Calculator,
      title: 'Best Rates',
      description: 'Compare quotes from top insurers and get the most competitive rates in the market.'
    }
  ];

  const services = [
    {
      icon: Heart,
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for individuals and families',
      features: ['Cashless treatment', 'Pre & post hospitalization', 'Annual health checkup']
    },
    {
      icon: Car,
      title: 'Motor Insurance',
      description: 'Complete protection for your four-wheeler vehicles',
      features: ['Own damage cover', 'Third party liability', 'Roadside assistance']
    },
    {
      icon: Bike,
      title: 'Two Wheeler Insurance',
      description: 'Affordable coverage for bikes and scooters',
      features: ['Theft protection', 'Accident coverage', 'Engine protection']
    },
    {
      icon: Shield,
      title: 'Life Insurance',
      description: 'Secure your family\'s financial future',
      features: ['Term life coverage', 'Investment options', 'Tax benefits']
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: 'var(--color-foreground)' }}
              >
                Insurance Made
                <span 
                  className="block"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Simple & Smart
                </span>
              </h1>
              
              <p 
                className="text-lg md:text-xl mb-8 leading-relaxed max-w-xl"
                style={{ color: 'var(--color-muted)' }}
              >
                Partner with India's leading insurers. Get the best rates, instant quotes, 
                and hassle-free claims with our comprehensive insurance solutions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={onLogin}
                  className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
                  style={{ 
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)'
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button
                  className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 border-2 group"
                  style={{ 
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                    backgroundColor: 'transparent'
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Learn More
                    <Play className="h-5 w-5" />
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {stats.partners}+
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    Insurance Partners
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {stats.customers.toLocaleString()}+
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {stats.claims}%
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    Claim Settlement
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div 
                className="rounded-3xl p-8 shadow-2xl"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <img
                  src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
                  alt="Insurance Dashboard"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                
                {/* Floating Stats Card */}
                <div 
                  className="absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-xl"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <div className="text-white text-center">
                    <div className="text-3xl font-bold mb-1">{stats.policies.toLocaleString()}+</div>
                    <div className="text-sm opacity-90">Policies Managed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible.features ? 'animate-fade-in' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-secondary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground)' }}
            >
              Why Choose Trovity?
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted)' }}
            >
              We make insurance simple, transparent, and accessible for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  <feature.icon 
                    className="h-8 w-8"
                    style={{ color: 'var(--color-primary)' }}
                  />
                </div>
                <h3 
                  className="text-xl font-bold mb-4"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible.services ? 'animate-slide-up' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground)' }}
            >
              Our Insurance Solutions
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted)' }}
            >
              Comprehensive coverage options designed to protect what matters most to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                style={{ 
                  backgroundColor: 'var(--color-card)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div className="flex items-start space-x-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <service.icon 
                      className="h-8 w-8"
                      style={{ color: 'var(--color-primary)' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-bold mb-3"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="mb-4 leading-relaxed"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span 
                            className="text-sm"
                            style={{ color: 'var(--color-foreground)' }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      className="mt-6 px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                      style={{ 
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-primary-foreground)'
                      }}
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section 
        id="statistics"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible.statistics ? 'animate-fade-in' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-secondary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground)' }}
            >
              Trusted by Millions
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted)' }}
            >
              Our numbers speak for themselves - join the growing community of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                {stats.partners}+
              </div>
              <div 
                className="text-lg font-medium"
                style={{ color: 'var(--color-foreground)' }}
              >
                Insurance Partners
              </div>
              <div 
                className="text-sm mt-1"
                style={{ color: 'var(--color-muted)' }}
              >
                Top-rated insurers
              </div>
            </div>
            
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                {stats.customers.toLocaleString()}+
              </div>
              <div 
                className="text-lg font-medium"
                style={{ color: 'var(--color-foreground)' }}
              >
                Happy Customers
              </div>
              <div 
                className="text-sm mt-1"
                style={{ color: 'var(--color-muted)' }}
              >
                Across India
              </div>
            </div>
            
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                {stats.policies.toLocaleString()}+
              </div>
              <div 
                className="text-lg font-medium"
                style={{ color: 'var(--color-foreground)' }}
              >
                Policies Issued
              </div>
              <div 
                className="text-sm mt-1"
                style={{ color: 'var(--color-muted)' }}
              >
                And counting
              </div>
            </div>
            
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                {stats.claims}%
              </div>
              <div 
                className="text-lg font-medium"
                style={{ color: 'var(--color-foreground)' }}
              >
                Claim Settlement
              </div>
              <div 
                className="text-sm mt-1"
                style={{ color: 'var(--color-muted)' }}
              >
                Industry leading
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section 
        id="partners"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible.partners ? 'animate-slide-up' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground)' }}
            >
              Our Insurance Partners
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted)' }}
            >
              We've partnered with India's most trusted insurance companies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible.cta ? 'animate-fade-in' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-secondary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div 
              className="rounded-3xl p-12 relative overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                boxShadow: '0 20px 40px rgba(185, 34, 80, 0.3)'
              }}
            >
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Get Protected?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied customers who trust us with their insurance needs. 
                  Get started today and experience the difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={onLogin}
                    className="px-8 py-4 bg-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Start Your Journey
                  </button>
                  <button 
                    className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-white/10"
                  >
                    Talk to Expert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible.contact ? 'animate-slide-up' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground)' }}
            >
              Get in Touch
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted)' }}
            >
              Have questions? Our insurance experts are here to help you find the perfect coverage
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              className="rounded-3xl p-8 shadow-xl"
              style={{ backgroundColor: 'var(--color-card)' }}
            >
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: 'var(--color-foreground)' }}
              >
                Send us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-105"
                      style={{ 
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-foreground)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-105"
                      style={{ 
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-foreground)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                </div>
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-105"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-105"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-105 resize-none"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ 
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)'
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div 
                className="rounded-2xl p-8 shadow-lg"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <Phone 
                      className="h-6 w-6"
                      style={{ color: 'var(--color-primary)' }}
                    />
                  </div>
                  <div>
                    <h3 
                      className="font-bold text-lg"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      Call Us
                    </h3>
                    <p 
                      className="text-lg"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      +91 1800-123-4567
                    </p>
                  </div>
                </div>
                <p style={{ color: 'var(--color-muted)' }}>
                  Available 24/7 for emergency claims and support
                </p>
              </div>

              <div 
                className="rounded-2xl p-8 shadow-lg"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <Mail 
                      className="h-6 w-6"
                      style={{ color: 'var(--color-primary)' }}
                    />
                  </div>
                  <div>
                    <h3 
                      className="font-bold text-lg"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      Email Us
                    </h3>
                    <p 
                      className="text-lg"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      support@trovity.com
                    </p>
                  </div>
                </div>
                <p style={{ color: 'var(--color-muted)' }}>
                  Get detailed responses within 24 hours
                </p>
              </div>

              <div 
                className="rounded-2xl p-8 shadow-lg"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <MapPin 
                      className="h-6 w-6"
                      style={{ color: 'var(--color-primary)' }}
                    />
                  </div>
                  <div>
                    <h3 
                      className="font-bold text-lg"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      Visit Us
                    </h3>
                    <p 
                      className="text-lg"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      Mumbai, Maharashtra
                    </p>
                  </div>
                </div>
                <p style={{ color: 'var(--color-muted)' }}>
                  Corporate office open Mon-Fri, 9 AM - 6 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-16 border-t"
        style={{ 
          backgroundColor: 'var(--color-card)',
          borderColor: 'var(--color-border)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <Shield 
                  className="h-8 w-8 mr-3"
                  style={{ color: 'var(--color-primary)' }}
                />
                <span 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  Trovity
                </span>
              </div>
              <p 
                className="text-lg mb-6 max-w-md"
                style={{ color: 'var(--color-muted)' }}
              >
                Making insurance simple, transparent, and accessible for everyone across India.
              </p>
              <div className="flex space-x-4">
                <button 
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  <Globe 
                    className="h-5 w-5"
                    style={{ color: 'var(--color-primary)' }}
                  />
                </button>
                <button 
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  <Mail 
                    className="h-5 w-5"
                    style={{ color: 'var(--color-primary)' }}
                  />
                </button>
                <button 
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  <Phone 
                    className="h-5 w-5"
                    style={{ color: 'var(--color-primary)' }}
                  />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 
                className="font-bold text-lg mb-6"
                style={{ color: 'var(--color-foreground)' }}
              >
                Quick Links
              </h4>
              <ul className="space-y-3">
                {['About Us', 'Insurance Products', 'Claims', 'Support', 'Blog'].map((link) => (
                  <li key={link}>
                    <a 
                      href="#"
                      className="transition-colors duration-300 hover:underline"
                      style={{ color: 'var(--color-muted)' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--color-muted)'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 
                className="font-bold text-lg mb-6"
                style={{ color: 'var(--color-foreground)' }}
              >
                Contact Info
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone 
                    className="h-5 w-5"
                    style={{ color: 'var(--color-primary)' }}
                  />
                  <span style={{ color: 'var(--color-muted)' }}>
                    +91 1800-123-4567
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail 
                    className="h-5 w-5"
                    style={{ color: 'var(--color-primary)' }}
                  />
                  <span style={{ color: 'var(--color-muted)' }}>
                    support@trovity.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin 
                    className="h-5 w-5"
                    style={{ color: 'var(--color-primary)' }}
                  />
                  <span style={{ color: 'var(--color-muted)' }}>
                    Mumbai, Maharashtra, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div 
            className="pt-8 border-t text-center"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <p style={{ color: 'var(--color-muted)' }}>
              © 2024 Trovity. All rights reserved. Making insurance simple and accessible for everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;