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
import { getDashboard } from "../../redux/slices/CommanSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state)=> state.commanStore);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch])

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection slides={dashboard?.banners} />
      <CategoriesSection categories={dashboard?.categories} />
      <NewInSection products={dashboard?.latest_products} />
      <BestsellersSection products={dashboard?.best_selling_products} />
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
