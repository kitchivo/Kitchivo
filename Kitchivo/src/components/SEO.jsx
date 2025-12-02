import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Kitchivo — Kitchen & Home Products',
  description = 'Discover quality kitchen and home products at Kitchivo. Shop bestsellers, new arrivals, cookware, storage solutions, and more.',
  keywords = 'kitchen products, home products, cookware, bakeware, storage, dinnerware, kitchen tools, home decor, Kitchivo',
  canonicalUrl = '',
  ogImage = '/Logo.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  schema = null,
  noindex = false,
}) => {
  const siteUrl = window.location.origin;
  const currentUrl = canonicalUrl || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={siteUrl + ogImage} />
      <meta property="og:site_name" content="Kitchivo" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={siteUrl + ogImage} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Kitchivo" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

