import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&h=1080&fit=crop',
      title: 'Transform Your Kitchen',
      subtitle: 'Premium Cookware & Kitchen Essentials',
      description: 'Discover high-quality products that make cooking a joy'
    },
    {
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop',
      title: 'Cooking Made Easy',
      subtitle: 'Smart Kitchen Tools & Gadgets',
      description: 'Experience the perfect blend of style and functionality'
    },
    {
      image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1920&h=1080&fit=crop',
      title: 'Elevate Your Home',
      subtitle: 'Modern Home Decor & Accessories',
      description: 'Create a space that reflects your unique style'
    },
    {
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop',
      title: 'Quality You Can Trust',
      subtitle: 'Durable & Long-lasting Products',
      description: 'Invest in excellence with our curated collection'
    },
    {
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920&h=1080&fit=crop',
      title: 'Kitchen Essentials',
      subtitle: 'Everything You Need in One Place',
      description: 'From basics to premium items, we have it all'
    },
    {
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1920&h=1080&fit=crop',
      title: 'Shop Smart, Live Better',
      subtitle: 'Exclusive Deals & Fast Delivery',
      description: 'Get the best products delivered to your doorstep'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] overflow-hidden mt-0">
      {/* Background Images with Animations */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 sm:from-black/70 sm:via-black/50 sm:to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-lima-500 w-8 sm:w-10' 
                : 'bg-white/50 hover:bg-white/80 w-2.5 sm:w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Animated Text Content */}
            <div className="space-y-4 sm:space-y-6">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-10 absolute'
                  }`}
                >
                  <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-lima-500/20 backdrop-blur-sm rounded-full">
                    <span className="text-lima-300 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                      {slide.subtitle}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg mb-3 sm:mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-100 drop-shadow-md mb-4 sm:mb-6">
                    {slide.description}
                  </p>
                </div>
              ))}
              
              {/* Buttons (Always Visible) */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 pt-2">
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-lima-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-lima-700 active:bg-lima-800 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-2xl shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Shop Now</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
