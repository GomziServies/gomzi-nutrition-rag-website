import React from "react";
import PageHeading from "../HOC/Header/PageHeading";
import BlogSection from "../component/ui/Blogs";
import SEO from "../component/SEO";

const Blog = () => {
  return (
    <>
      <SEO
        title="Fitness & Nutrition Blog | Expert Tips & Supplement Guides | Gomzi Supplement"
        description="Read expert fitness tips, nutrition advice, supplement guides, workout routines and healthy lifestyle articles from Gomzi Supplement to achieve your goals."
      />
      <PageHeading head="Blog" />
      <BlogSection />
    </>
  );
};

export default Blog;
