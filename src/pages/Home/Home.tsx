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
  Zap
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
    claims: 0
  });

  useEffect(() => {
    // Animate statistics
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const partnersTarget = 25;
      const customersTarget = 15000;
      const claimsTarget = 98;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setStats({
          partners: Math.floor(partnersTarget * progress),
          customers: Math.floor(customersTarget * progress),
          claims: Math.floor(claimsTarget * progress)
        });

        if (step >= steps) {
          clearInterval(interval);
          setStats({ partners: partnersTarget, customers: customersTarget, claims: claimsTarget });
        }
      }, duration / steps);
    };

    animateStats();
  }, []);

  // Testimonials carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
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

  const insuranceTypes = [
    {
      icon: Heart,
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for you and your family',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Life Insurance',
      description: 'Secure your family\'s financial future',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Bike,
      title: 'Two Wheeler',
      description: 'Complete protection for your bike or scooter',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Car,
      title: 'Four Wheeler',
      description: 'Comprehensive car insurance coverage',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'Trovity made insurance so simple! Got my health policy in minutes with the best rates.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'Amazing service and support. The ₹99 subscription saved me thousands on premiums!'
    },
    {
      name: 'Anita Patel',
      role: 'Teacher',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'Quick claim settlement and excellent customer service. Highly recommended!'
    }
  ];

  const founders = [
    {
      name: 'Amit Sharma',
      role: 'CEO & Co-Founder',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      bio: '15+ years in fintech and insurance. Former VP at leading insurance companies.'
    },
    {
      name: 'Sneha Gupta',
      role: 'CTO & Co-Founder',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      bio: 'Tech visionary with expertise in AI and digital transformation in insurance.'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onLogin}
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-3xl group"
          style={{ 
            background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
            boxShadow: '0 8px 32px rgba(185, 34, 80, 0.3)'
          }}
        >
          <Phone className="h-6 w-6 text-white group-hover:animate-pulse" />
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(135deg, var(--color-primary), var(--color-accent), var(--color-secondary))`
            }}
          />
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full opacity-20 animate-pulse"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ color: 'var(--color-foreground)' }}
            >
              Insurance Made
              <span 
                className="block bg-gradient-to-r bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`
                }}
              >
                Simple & Smart
              </span>
            </h1>
            
            <p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              Partner with India's leading insurers. Get the best rates, instant quotes, 
              and hassle-free claims with our exclusive ₹99 subscription plan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={onLogin}
                className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  boxShadow: '0 8px 32px rgba(185, 34, 80, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Login to Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              
              <button
                className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 group"
                style={{ 
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'transparent'
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  Get Free Quote
                  <Zap className="h-5 w-5 group-hover:text-yellow-400 transition-colors" />
                </span>
              </button>
            </div>

            {/* Animated Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {stats.partners}+
                </div>
                <div style={{ color: 'var(--color-muted)' }}>Insurance Partners</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {stats.customers.toLocaleString()}+
                </div>
                <div style={{ color: 'var(--color-muted)' }}>Happy Customers</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {stats.claims}%
                </div>
                <div style={{ color: 'var(--color-muted)' }}>Claim Settlement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div 
            className="w-6 h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: 'var(--color-primary)' }}
          >
            <div 
              className="w-1 h-3 rounded-full mt-2 animate-pulse"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section 
        id="partners"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible.partners ? 'animate-slide-up' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-secondary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground)' }}
            >
              Trusted by Leading Insurers
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted)' }}
            >
              We've partnered with India's top insurance companies to bring you the best coverage options
            </p>
          </div>

          {/* Partners Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-12">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 h-16 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'var(--color-card)' }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Subscription Highlight */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div 
              className="rounded-3xl p-8 text-center relative overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                boxShadow: '0 20px 40px rgba(185, 34, 80, 0.3)'
              }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-white mr-3" />
                  <span className="text-2xl font-bold text-white">Exclusive Offer</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ₹99 Annual Subscription
                </h3>
                <p className="text-xl text-white/90 mb-6">
                  Get access to exclusive rates, priority support, and premium features
                </p>
                <button 
                  className="px-8 py-3 bg-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Subscribe Now
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Types Section */}
      <section 
        id="insurance-types"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible['insurance-types'] ? 'animate-fade-in' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground)' }}
            >
              Get Your Quote in Minutes
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted)' }}
            >
              Choose from our comprehensive insurance solutions tailored for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {insuranceTypes.map((type, index) => (
              <div
                key={index}
                className="group relative rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
                style={{ 
                  backgroundColor: 'var(--color-card)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <type.icon 
                      className="h-8 w-8"
                      style={{ color: 'var(--color-primary)' }}
                    />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    {type.title}
                  </h3>
                  <p 
                    className="text-sm mb-6 leading-relaxed"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {type.description}
                  </p>
                  <button 
                    className="w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                    style={{ 
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-primary-foreground)'
                    }}
                  >
                    Get Quote
                  </button>
                </div>
                
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section 
        id="founders"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible.founders ? 'animate-slide-up' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-secondary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground)' }}
            >
              Meet Our Founders
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted)' }}
            >
              Industry veterans committed to revolutionizing insurance in India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="relative mb-6 inline-block">
                  <div className="w-48 h-48 mx-auto rounded-3xl overflow-hidden transition-all duration-500 group-hover:scale-105">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                  </div>
                </div>
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {founder.name}
                </h3>
                <p 
                  className="text-lg mb-4"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {founder.role}
                </p>
                <p 
                  className="leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible.testimonials ? 'animate-fade-in' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground)' }}
            >
              What Our Customers Say
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted)' }}
            >
              Join thousands of satisfied customers who trust us with their insurance needs
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 p-12 text-center"
                    style={{ backgroundColor: 'var(--color-card)' }}
                  >
                    <div className="mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-5 w-5 fill-current"
                            style={{ color: 'var(--color-accent)' }}
                          />
                        ))}
                      </div>
                    </div>
                    <blockquote 
                      className="text-xl italic mb-6 leading-relaxed"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      "{testimonial.text}"
                    </blockquote>
                    <div>
                      <div 
                        className="font-bold text-lg"
                        style={{ color: 'var(--color-foreground)' }}
                      >
                        {testimonial.name}
                      </div>
                      <div style={{ color: 'var(--color-muted)' }}>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'scale-125' : 'opacity-50'
                  }`}
                  style={{ 
                    backgroundColor: index === currentTestimonial 
                      ? 'var(--color-primary)' 
                      : 'var(--color-muted)' 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact"
        data-animate
        className={`py-20 transition-all duration-1000 ${isVisible.contact ? 'animate-slide-up' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--color-secondary)' }}
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
              className="rounded-3xl p-8"
              style={{ backgroundColor: 'var(--color-card)' }}
            >
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
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
                  <input
                    type="email"
                    placeholder="Your Email"
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
                  <textarea
                    placeholder="Your Message"
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
                  className="w-full py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ 
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)'
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div 
                className="rounded-3xl p-8"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
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
                    <p style={{ color: 'var(--color-muted)' }}>
                      +91 1800-123-4567
                    </p>
                  </div>
                </div>
              </div>

              <div 
                className="rounded-3xl p-8"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
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
                    <p style={{ color: 'var(--color-muted)' }}>
                      support@trovity.com
                    </p>
                  </div>
                </div>
              </div>

              <div 
                className="rounded-3xl p-8"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
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
                    <p style={{ color: 'var(--color-muted)' }}>
                      Mumbai, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-12 border-t"
        style={{ 
          backgroundColor: 'var(--color-background)',
          borderColor: 'var(--color-border)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
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