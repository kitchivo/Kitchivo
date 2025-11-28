import React, { useEffect, useState } from "react";
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

const Home = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state)=> state.commanStore);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch])

  const handleAddToWishlist = async (product) => {
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
  };

  return (
    <div className="min-h-screen bg-white font-sans">
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
