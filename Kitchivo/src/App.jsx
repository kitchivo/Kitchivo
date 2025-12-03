import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile } from './redux/slices/AuthSlice';
import { useEffect } from 'react';
import { getDashboard, getSystemSettings } from './redux/slices/CommanSlice';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load all routes for code splitting
const Home = lazy(() => import('./Pages/Home/Home'));
const Login = lazy(() => import('./Pages/Auth/Login'));
const Register = lazy(() => import('./Pages/Auth/Register'));
const VerifyOTP = lazy(() => import('./Pages/Auth/VerifyOTP'));
const ForgotPassword = lazy(() => import('./Pages/Auth/ForgotPassword'));
const Wishlist = lazy(() => import('./Pages/Wishlist/Wishlist'));
const ProductDetail = lazy(() => import('./Pages/ProductDetail/ProductDetail'));
const CategoryProducts = lazy(() => import('./Pages/CategoryProducts/CategoryProducts'));
const About = lazy(() => import('./Pages/About/About'));
const Contact = lazy(() => import('./Pages/Contact/Contact'));
const Products = lazy(() => import('./Pages/Products/Products'));
const NewProducts = lazy(() => import('./Pages/NewProducts/NewProducts'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./Pages/TermsOfService/TermsOfService'));
const ProfileEdit = lazy(() => import('./Pages/ProfileEdit/ProfileEdit'));
const Profile = lazy(() => import('./Pages/Profile/Profile'));
const ChangePassword = lazy(() => import('./Pages/ChangePassword/ChangePassword'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-lima-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const token = useMemo(() => localStorage.getItem("token"), []);
  
  useEffect(() => {
    dispatch(getDashboard());
    dispatch(getSystemSettings());
    if (token) {
      dispatch(getProfile());
    }
  }, [dispatch, token]);


  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/new-products" element={<NewProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/category/:category_id" element={<CategoryProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
