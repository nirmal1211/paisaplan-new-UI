import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InsuranceType {
  type: string;
  image: string;
  description: string;
  ctaLink: string;
}

interface InsuranceCarouselProps {
  insuranceTypes: InsuranceType[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const InsuranceCarousel: React.FC<InsuranceCarouselProps> = ({ 
  insuranceTypes, 
  autoSlide = true, 
  autoSlideInterval = 3000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoSlide || insuranceTypes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % insuranceTypes.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, insuranceTypes.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % insuranceTypes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + insuranceTypes.length) % insuranceTypes.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (insuranceTypes.length === 0) {
    return (
      <div className="rounded-xl shadow-lg border h-full flex items-center justify-center" 
           style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
          No insurance types available
        </p>
      </div>
    );
  }

  const slide = insuranceTypes[currentSlide];

  return (
    <div className="relative rounded-xl shadow-lg overflow-hidden h-full border" 
         style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
      {/* Main slide content */}
      <div className="relative h-full">
        <div className="h-32 overflow-hidden">
          <img 
            src={slide.image} 
            alt={slide.type}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {slide.type}
            </h3>
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: 'var(--color-secondary)', 
                color: 'var(--color-primary)' 
              }}
            >
              Insurance
            </span>
          </div>
          
          <p className="font-roboto text-sm mb-4 line-clamp-2" style={{ color: 'var(--color-muted)' }}>
            {slide.description}
          </p>
          
          <button 
            className="w-full font-semibold py-2 px-4 rounded-lg transition-colors duration-200 font-roboto text-white hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
            onClick={() => window.location.href = slide.ctaLink}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      {insuranceTypes.length > 1 && (
        <>
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
            {insuranceTypes.map((_, index) => (
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
        </>
      )}
    </div>
  );
};

export default InsuranceCarousel;