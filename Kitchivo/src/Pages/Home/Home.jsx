import React, { useEffect, useCallback, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import BestsellersSection from "./BestsellersSection";
import NewInSection from "./NewInSection";
import FAQsSection from "./FAQsSection";
import FindUsOnSection from "./FindUsOnSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import NewsletterSection from "./NewsletterSection";
import TestimonialsSection from "./TestimonialsSection";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard, createWishlist } from "../../redux/slices/CommanSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getProfile } from "../../redux/slices/AuthSlice";
import SEO from "../../components/SEO";

const Home = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state)=> state.commanStore);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch])

  const handleAddToWishlist = useCallback(async (product) => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Login required',
        text: 'Please login first to add products to your wishlist.',
        icon: 'warning',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    // if (product?.is_wishlisted) {
    //   return;
    // }

    const productId = product?.id;
    if (!productId) {
      return;
    }

    try {
      const resultAction = await dispatch(createWishlist({ product_id: productId }));
      if (resultAction?.payload?.status == 1) {
        toast.success(resultAction?.payload?.message || 'Added to wishlist');
        dispatch(getDashboard());
        dispatch(getProfile());
      } else {
        toast.error(resultAction?.payload?.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  }, [dispatch, navigate]);

  const organizationSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kitchivo",
    "url": window.location.origin,
    "logo": window.location.origin + "/Logo.png",
    "description": "Quality kitchen and home products. Discover bestsellers, new arrivals, and curated collections.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+390235568493",
      "contactType": "Customer Service"
    },
    "sameAs": [
      dashboard?.systemSettings?.facebook_link,
      dashboard?.systemSettings?.instagram_link,
      dashboard?.systemSettings?.twitter_link,
      dashboard?.systemSettings?.youtube_link
    ].filter(Boolean)
  }), [dashboard?.systemSettings]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title="Kitchivo — Premium Kitchen & Home Products | Shop Quality Cookware, Storage & More"
        description="Discover quality kitchen and home products at Kitchivo. Shop bestsellers, new arrivals, cookware, storage solutions, dinnerware, and kitchen tools. Free shipping on select items."
        keywords="kitchen products, home products, cookware, bakeware, storage solutions, dinnerware, kitchen tools, home decor, Kitchivo, kitchen utensils, cooking equipment"
        canonicalUrl={window.location.origin}
        schema={organizationSchema}
      />
      <Navbar />
      <HeroSection slides={dashboard?.banners} />
      <CategoriesSection categories={dashboard?.categories} />
      <NewInSection products={dashboard?.latest_products} onAddToWishlist={handleAddToWishlist} />
      <BestsellersSection products={dashboard?.best_selling_products} onAddToWishlist={handleAddToWishlist} />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FAQsSection faqs={dashboard?.faqs} />
      <NewsletterSection />
      <FindUsOnSection />
      <Footer />
    </div>
  );
};

export default Home;
