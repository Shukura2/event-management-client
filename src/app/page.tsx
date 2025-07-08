"use client";
import React from "react";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import "./globals.css";
import WhyChooseUs from "@/components/WhyChooseUs";
import EventsInNewYork from "@/components/EventsInNewYork";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";
import Testimonial from "@/components/Testimonial";

const Home = () => {
  return (
    <div>
      <div className="home">
        <Navbar />
        <HeroSection />
      </div>
      <WhyChooseUs />
      <EventsInNewYork />
      <Testimonial />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Home;
