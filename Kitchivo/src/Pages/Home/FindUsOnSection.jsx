import React from 'react';

const FindUsOnSection = () => {
  const platforms = [
    
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      link: '#'
    },
    {
      name: 'Myntra',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/65c5da9f878952603e370d03_Myntra-Logo_1.svg',
      link: '#'
    },
    {
      name: 'Flipkart',
      logo: 'https://cdn.worldvectorlogo.com/logos/flipkart.svg',
      link: '#'
    },
   
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-lima-100 text-lima-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            SHOP WITH US
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-2 sm:mb-4">Find Us On</h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">Available on your favorite shopping platforms</p>
        </div>

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl w-full">
            {platforms.map((platform, index) => (
              <a
                key={index}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl p-6 sm:p-8 flex items-center justify-center hover:border-lima-500 hover:shadow-xl active:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:-translate-y-0 group w-full"
            >
              <img 
                src={platform.logo} 
                alt={platform.name}
                className="w-full h-10 sm:h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x80?text=' + platform.name;
                }}
              />
            </a>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUsOnSection;
