import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { InsuranceSlide } from '../../types/policy';

interface InsuranceCarouselProps {
  slides: InsuranceSlide[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const InsuranceCarousel: React.FC<InsuranceCarouselProps> = ({ 
  slides, 
  autoSlide = true, 
  autoSlideInterval = 4000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (slides.length === 0) return null;

  const slide = slides[currentSlide];

  return (
    <div className="relative rounded-xl shadow-lg overflow-hidden h-full" style={{ backgroundColor: 'var(--color-card)' }}>
      {/* Main slide content */}
      <div className="relative h-full">
        <div className="h-32 overflow-hidden">
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>{slide.title}</h3>
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: 'var(--color-secondary)', 
                color: 'var(--color-primary)' 
              }}
            >
              {slide.type}
            </span>
          </div>
          
          <p className="font-roboto text-sm mb-3 line-clamp-2" style={{ color: 'var(--color-muted)' }}>
            {slide.description}
          </p>
          
          <div className="mb-3">
            <h4 className="text-xs font-semibold mb-2 font-roboto" style={{ color: 'var(--color-foreground)' }}>Key Features:</h4>
            <div className="grid grid-cols-2 gap-1">
              {slide.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center text-xs" style={{ color: 'var(--color-muted)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="w-full font-semibold py-2 px-4 rounded-lg transition-colors duration-200 font-roboto text-white hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 z-10"
        style={{ color: 'var(--color-foreground)' }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 z-10"
        style={{ color: 'var(--color-foreground)' }}
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'w-4' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
            style={{
              backgroundColor: index === currentSlide ? 'var(--color-primary)' : undefined
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default InsuranceCarousel;