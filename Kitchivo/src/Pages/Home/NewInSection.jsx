import React, { useRef } from 'react';
import ProductCard from '../../components/ProductCard';

const NewInSection = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const products = [
    { id: 1, name: 'Memory Foam Pillow', description: 'Handcrafted artisan design', originalPrice: '₹1,999', price: '₹529', discount: '-71%', image: 'https://m.media-amazon.com/images/I/61PdLfoIlHL._SX300_SY300_QL70_FMwebp_.jpg', amazonLink: '#' },
    { id: 2, name: 'Plastic Modular Drawer Storage', description: 'Eco-friendly borosilicate glass', originalPrice: '₹1,999', price: '₹899', discount: '-55%', image: 'https://m.media-amazon.com/images/I/713PnYt0aEL._SX679_.jpg', amazonLink: '#' },
    { id: 3, name: 'Multipurpose Modular Drawer', description: 'Sustainable kitchen essential', originalPrice: '₹1,999', price: '₹1,199', discount: '-31%', image: 'https://m.media-amazon.com/images/I/71G94w0sIgL._SX679_.jpg', amazonLink: '#' },
    { id: 4, name: 'Stainless Steel Cookware', description: 'Premium 5-piece set', price: '₹8,999', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 5, name: 'Modern Tea Kettle', description: 'Elegant design with whistle', originalPrice: '₹2,799', price: '₹2,299', discount: '-15%', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 6, name: 'Minimalist Dinnerware Set', description: '16-piece modern collection', price: '₹12,499', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 7, name: 'Wooden Utensil Holder', description: 'Natural bamboo organizer', originalPrice: '₹1,499', price: '₹1,199', discount: '-20%', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 8, name: 'Crystal Wine Glasses', description: 'Set of 6 elegant glasses', price: '₹4,599', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop', amazonLink: '#' },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-lima-100 text-lima-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            LATEST ARRIVALS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-2 sm:mb-4">New In</h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">Discover our newest collection of home essentials</p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-0 sm:px-8 md:px-12">
          {/* Left Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-lima-600 hover:text-white active:bg-lima-700 transition-all duration-300"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-lima-600 hover:text-white active:bg-lima-700 transition-all duration-300"
            aria-label="Next"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Products Slider */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-none w-[280px] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewInSection;
