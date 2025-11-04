import React, { useState } from "react";
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

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <NewInSection />
      <BestsellersSection />
      <WhyChooseUsSection />
      <FAQsSection />
      <NewsletterSection />
      <FindUsOnSection />
      <Footer />
    </div>
  );
};

export default Home;
