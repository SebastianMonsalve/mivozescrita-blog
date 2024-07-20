import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection.jsx";
import BlogPostCard from "../../components/blogPostCard/BlogPostCard.jsx";
import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <HeroSection />
      <BlogPostCard />
    </Layout>
  );
}

export default Home;
