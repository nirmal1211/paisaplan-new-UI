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
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden h-full">
      {/* Main slide content */}
      <div className="relative h-full">
        <div className="h-48 overflow-hidden">
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 font-poppins">{slide.title}</h3>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              {slide.type}
            </span>
          </div>
          
          <p className="text-gray-600 font-roboto text-sm mb-4 line-clamp-3">
            {slide.description}
          </p>
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2 font-roboto">Key Features:</h4>
            <div className="grid grid-cols-2 gap-1">
              {slide.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 font-roboto">
            Buy Now
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-primary-600 w-6' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default InsuranceCarousel;