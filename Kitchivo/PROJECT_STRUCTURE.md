# Kitchivo - Project File Structure

## Overview
Kitchivo is a React application built with Vite, featuring a modern kitchen and home essentials e-commerce platform. It's a full-stack e-commerce solution with user authentication, product management, wishlist functionality, and seamless integration with external marketplaces.

## Technology Stack
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 7.8.0
- **State Management**: Redux Toolkit 2.11.0
- **Styling**: Tailwind CSS 4.1.12
- **Animations**: Framer Motion 12.23.24
- **Carousel**: Swiper 12.0.3
- **HTTP Client**: Axios 1.13.2
- **Form Management**: Formik 2.4.9 + Yup 1.7.1
- **Notifications**: React Toastify 11.0.5
- **Alerts**: SweetAlert2 11.26.3
- **SEO**: React Helmet Async 2.0.5
- **Internationalization**: i18next 25.6.3 + React i18next 16.3.5
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel

## Project Structure

```
Kitchivo/
├── eslint.config.js          # ESLint configuration for code linting
├── index.html                # Main HTML file for the app
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Dependency lock file
├── vercel.json               # Vercel deployment configuration
├── vite.config.js            # Vite configuration file
├── public/                   # Static assets (images, icons, etc.)
│   ├── favicon.ico
│   ├── Logo.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── vite.svg
├── dist/                     # Production build output
├── node_modules/             # Dependencies
├── src/                      # Source code for the React app
│   ├── api/                  # API configuration
│   │   └── baseApi.js        # Axios instance with base URL
│   ├── assets/               # Additional assets (images, fonts, etc.)
│   │   ├── amazon.svg
│   │   ├── delete.svg
│   │   ├── flipkart.svg
│   │   ├── Kitchivo Logo.png
│   │   ├── Logo_Full.png
│   │   ├── Logo.png
│   │   ├── myntra.svg
│   │   └── react.svg
│   ├── components/           # Reusable UI components
│   │   ├── Breadcrumb.jsx    # Breadcrumb navigation component
│   │   ├── Footer.jsx        # Footer component with links
│   │   ├── FooterCurrencySelector.jsx  # Currency selector in footer
│   │   ├── Navbar.jsx        # Navigation bar (dynamic Collections dropdown, search)
│   │   ├── ProductCard.jsx   # Reusable product card component
│   │   ├── ProductPrice.jsx  # Product price display component
│   │   └── SEO.jsx           # SEO meta tags component
│   ├── context/              # React Context providers
│   │   └── AuthContext.jsx   # Authentication context provider
│   ├── data/                 # Static data files
│   │   ├── productsData.js   # Product data (if any static data)
│   │   └── README.md
│   ├── helpers/              # Utility functions
│   │   ├── authHeader.js     # Helper for auth headers
│   │   └── numberInput.js    # Number input utilities
│   ├── hooks/                # Custom React hooks
│   │   └── usePreferredCurrency.js  # Currency preference hook
│   ├── redux/                # Redux state management
│   │   ├── slices/           # Redux slices
│   │   │   ├── AuthSlice.js  # Authentication state & actions
│   │   │   └── CommanSlice.js # Common app state (products, wishlist, etc.)
│   │   └── store.js          # Redux store configuration
│   ├── routes/               # Route configuration
│   │   └── PrivateRoutes.js  # Protected route wrapper
│   ├── services/             # API service functions
│   │   ├── AuthServices.js   # Authentication API calls
│   │   └── CommanService.js  # Common API calls (products, wishlist, etc.)
│   ├── Pages/                # Page-level components, organized by feature
│   │   ├── About/            # About page
│   │   │   └── About.jsx
│   │   ├── Auth/             # Authentication pages
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── VerifyOTP.jsx
│   │   ├── CategoryProducts/ # Category-specific products page
│   │   │   └── CategoryProducts.jsx
│   │   ├── ChangePassword/   # Change password page
│   │   │   └── ChangePassword.jsx
│   │   ├── Contact/          # Contact page
│   │   │   └── Contact.jsx
│   │   ├── Home/             # Home page sections
│   │   │   ├── BestsellersSection.jsx
│   │   │   ├── CategoriesSection.jsx
│   │   │   ├── FAQsSection.jsx
│   │   │   ├── FindUsOnSection.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Home.jsx      # Main home page component
│   │   │   ├── NewInSection.jsx
│   │   │   ├── NewsletterSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   └── WhyChooseUsSection.jsx
│   │   ├── NewProducts/      # New Products listing page
│   │   │   └── NewProducts.jsx
│   │   ├── PrivacyPolicy/    # Privacy policy page
│   │   │   └── PrivacyPolicy.jsx
│   │   ├── ProductDetail/    # Product detail page
│   │   │   └── ProductDetail.jsx
│   │   ├── Products/         # Products listing page
│   │   │   └── Products.jsx
│   │   ├── Profile/          # User profile page
│   │   │   └── Profile.jsx
│   │   ├── ProfileEdit/      # Edit profile page
│   │   │   └── ProfileEdit.jsx
│   │   ├── TermsOfService/   # Terms of service page
│   │   │   └── TermsOfService.jsx
│   │   └── Wishlist/         # Wishlist page
│   │       └── Wishlist.jsx
│   ├── App.css               # Main app styles
│   ├── App.jsx               # Main app component with routing
│   ├── index.css             # Global styles
│   ├── main.jsx              # App entry point
│   └── ScrollToTop.jsx      # Scroll to top on route change
```


## Key Features

### State Management
- **Redux Toolkit**: Centralized state management with two main slices:
  - `AuthSlice`: Manages user authentication, profile, OTP verification, password reset
  - `CommanSlice`: Manages products, wishlist, dashboard data, search results, system settings
- **Context API**: Additional authentication context for login/logout actions
- **Local Storage**: Token and user data persistence

### API Integration
- **Base API**: Centralized Axios instance with configurable base URL
- **Service Layer**: Separated API calls into service files:
  - `AuthServices`: Authentication-related API calls
  - `CommanService`: Product, wishlist, dashboard, and common API calls
- **Authentication Headers**: Automatic token injection for protected routes
- **Error Handling**: Toast notifications for API errors

### Dynamic Collections Dropdown
The Navbar's "Collections" dropdown automatically displays all product categories from the API data. Any new category added to the backend will instantly appear in the dropdown, ensuring the menu is always up-to-date.

### Search Functionality
- **Real-time Search**: Debounced search (300ms delay) to reduce API calls
- **Search Dropdown**: Live search results displayed in dropdown
- **Search Integration**: Integrated in navbar with click-outside detection
- **Search Results**: Stored in Redux state for easy access

### Authentication System
- **Registration Flow**: Email/Phone → OTP Verification → Account Creation
- **Login**: Email/Password authentication with JWT tokens
- **Password Recovery**: Forgot password → OTP → Reset password
- **Protected Routes**: PrivateRoutes wrapper for authenticated pages
- **Auto-login**: Token persistence with automatic profile fetch

### Routing
The application uses React Router DOM with the following routes:
- `/` - Home page (public)
- `/products` - Products listing page with filters (public)
- `/new-products` - New Products listing page (public)
- `/login` - User login (public)
- `/register` - User registration (public)
- `/verify-otp` - OTP verification (public)
- `/forgot-password` - Password recovery (public)
- `/wishlist` - User wishlist (protected)
- `/about` - About page (public)
- `/contact` - Contact page (public)
- `/category/:category_id` - Category-specific products (public)
- `/product/:id` - Individual product details (public)
- `/profile` - User profile page (protected)
- `/profile-edit` - Edit user profile (protected)
- `/change-password` - Change password (protected)
- `/privacy-policy` - Privacy policy page (public)
- `/terms-of-service` - Terms of service page (public)

### Products & Filtering Features
Both `/products` and `/new-products` pages include:
- **Breadcrumb Navigation**: Clear navigation path from Home to Products
- **Sidebar Filters**: Professional sidebar with sticky positioning
- **Category Filtering**: Dynamic category selection from API data
- **Custom Sort Dropdown**: 6 sorting options with visual feedback
  - Featured
  - Newest First
  - Price: Low to High
  - Price: High to Low
  - Highest Rated
  - Name: A to Z
- **Price Range Filter**: Multiple price range options with radio buttons
- **Enhanced Product Data**: Each product includes rating, reviews, and badges (New, Bestseller)
- **Product Count**: Display total number of filtered products
- **Reset Filters**: One-click reset of all filters
- **Pagination**: Server-side pagination support
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Animations**: Smooth animations using Framer Motion
- **Empty State**: User-friendly message when no products match filters

### Wishlist System
- **Add to Wishlist**: One-click wishlist addition from product cards
- **Remove from Wishlist**: Easy removal from wishlist page
- **Authentication Required**: SweetAlert prompt for login if not authenticated
- **Wishlist Page**: Dedicated page to view all wishlisted items
- **Wishlist Indicator**: Visual feedback for wishlisted products
- **Persistent Storage**: Wishlist synced with backend API

### Product Display
- **Product Cards**: Reusable ProductCard component with:
  - Hover effects (desktop) / Always visible (mobile)
  - Quick view button
  - Wishlist toggle button
  - Product image with zoom effect
  - Dynamic pricing display
  - Product badges (New, Bestseller)
- **Product Detail Page**: Comprehensive product information with:
  - Image gallery
  - Product specifications
  - Reviews and ratings
  - External purchase links (Amazon, Flipkart, Myntra)
  - Related products

### Home Page Sections
The home page is modular with separate section components:
- **HeroSection**: Banner slider with promotional content
- **CategoriesSection**: Product categories grid
- **NewInSection**: Latest products carousel
- **BestsellersSection**: Best-selling products showcase
- **WhyChooseUsSection**: Brand value propositions
- **TestimonialsSection**: Customer reviews carousel
- **FAQsSection**: Frequently asked questions
- **NewsletterSection**: Email subscription form
- **FindUsOnSection**: Social media links

### Component Architecture
- **Reusable Components**: 
  - `ProductCard`: Used across Home, Products, Category, and Wishlist pages
  - `ProductPrice`: Consistent price display formatting
  - `Breadcrumb`: Navigation breadcrumbs
  - `SEO`: Dynamic meta tags management
- **Modular Structure**: Pages organized by feature for better maintainability
- **Section-based Home Page**: Home page divided into clear, reusable sections
- **Layout Components**: Navbar and Footer used across all pages

## Development Scripts
```json
"dev": "vite"           // Start development server
"build": "vite build"   // Build for production
"lint": "eslint ."      // Run linting
"preview": "vite preview" // Preview production build
```

## Best Practices Implemented
1. **Component Modularity**: Separated concerns with reusable components
2. **Feature-based Organization**: Pages grouped by functionality
3. **Responsive Design**: Mobile-first approach with Tailwind CSS
4. **Modern React**: Using hooks and functional components exclusively
5. **State Management**: Redux Toolkit for global state, Context API for auth
6. **Code Quality**: ESLint configuration for code quality
7. **Performance**: Optimized builds with Vite, debounced search, lazy loading
8. **SEO Optimization**: React Helmet for dynamic meta tags, Schema.org structured data
9. **Error Handling**: Comprehensive error handling with toast notifications
10. **API Layer**: Separated API calls into service files for maintainability
11. **Authentication**: JWT token-based authentication with secure storage
12. **Accessibility**: ARIA labels and semantic HTML
13. **Analytics**: Vercel Analytics and Speed Insights integration

## SEO Features
- **Dynamic Meta Tags**: React Helmet Async for page-specific SEO
- **Structured Data**: Schema.org JSON-LD for Organization schema
- **Open Graph Tags**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine crawling directives
- **Canonical URLs**: Prevent duplicate content issues

## Performance Optimizations
- **Vite Build Tool**: Lightning-fast development and optimized production builds
- **Code Splitting**: Route-based code splitting for smaller bundles
- **Image Optimization**: Proper image sizing and formats
- **Debounced Search**: Reduces unnecessary API calls
- **Lazy Loading**: Components loaded on demand
- **Redux DevTools**: Enabled for debugging in development

## Deployment
- **Platform**: Vercel
- **Build Command**: `npm install --legacy-peer-deps && npm run build`
- **SPA Routing**: Rewrites configuration for client-side routing
- **Environment Variables**: API base URL configured via `VITE_APP_API_BASE_URL`
- **Analytics**: Vercel Analytics and Speed Insights automatically integrated

## API Structure

### Base Configuration
- **Base URL**: Configured via environment variable `VITE_APP_API_BASE_URL`
- **Axios Instance**: Centralized in `src/api/baseApi.js`
- **Authentication**: JWT tokens sent via Authorization headers
- **Error Handling**: Global error handling with toast notifications

### API Endpoints Used
- **Authentication**: `/login/`, `/register/`, `/verify-otp/`, `/forgot-password/`, `/reset-password/`, `/change-password/`
- **User**: `/user/profile/`
- **Products**: `/products/`, `/products/:id`, `/product-category/`, `/search-products/`
- **Wishlist**: `/wishlist/`, `/wishlist/add/`, `/wishlist/remove/`
- **Reviews**: `/reviews/add/`
- **Dashboard**: `/dashboard/`
- **System**: `/system-settings/`
- **Contact**: `/contact-us/`

## Environment Setup

### Required Environment Variables
```env
VITE_APP_API_BASE_URL=your_api_base_url
```

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Project Highlights

### User Experience
- **Smooth Animations**: Framer Motion for engaging interactions
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Non-intrusive success/error notifications
- **Sweet Alerts**: Beautiful confirmation dialogs

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route guards for authenticated pages
- **Secure Storage**: Token stored in localStorage
- **API Security**: Authentication headers for protected endpoints

### External Integrations
- **Marketplace Links**: Direct links to Amazon, Flipkart, and Myntra
- **Social Media**: Integration with Facebook, Instagram, Twitter, YouTube
- **Analytics**: Vercel Analytics and Speed Insights

---
**Last Updated**: December 2024
