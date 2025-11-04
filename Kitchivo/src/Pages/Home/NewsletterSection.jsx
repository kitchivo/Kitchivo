import React, { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <section className="relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Parallax Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&h=1080&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-black/70 sm:bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Stay Updated with Kitchivo
        </h2>
        <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10">
          Subscribe to get special offers, free giveaways, and exclusive deals.
        </p>

        {/* Simple Newsletter Form */}
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-lima-500/50 text-sm sm:text-base md:text-lg border-2 border-white"
          />
          <button
            type="submit"
            className="px-8 sm:px-10 py-3 sm:py-4 bg-lima-600 text-white font-bold rounded-lg hover:bg-lima-700 active:bg-lima-800 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        <p className="text-white/70 text-xs sm:text-sm mt-4 sm:mt-6">
          🔒 We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
