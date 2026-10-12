import React from "react";
import ProductCard from "../common/ProductCard"; // tamaro existing card component
import Wavyheading from "../common/Wavyheading";

const products = [
  {
    id: 1,
    badge: "LONGEVITY MONTH",
    discount: "-40%",
    image: "/images/p1off.webp",
    stars: 5,
    reviews: 17,
    name: "Gomzi Supplement by RAG LONGEVITY CHOCOLATE",
    category: "Longevity",
    price: 4250,
    originalPrice: 7080,
  },
  {
    id: 2,
    image: "/images/p2.webp",
    stars: 5,
    reviews: 22,
    name: "Gomzi Supplement by RAG MATCHA Coconut",
    category: "Energy",
    price: 4580,
    originalPrice: null,
  },
  {
    id: 3,
    image: "/images/p3.webp",
    stars: 5,
    reviews: 41,
    name: "Gomzi Supplement by RAG MATCHA Strawberry",
    category: "Energy",
    price: 4580,
    originalPrice: null,
  },
  {
    id: 4,
    image: "/images/p4.webp",
    stars: 4,
    reviews: 31,
    name: "Gomzi Supplement by RAG ORIGINAL BANANA",
    category: "Wellbeing",
    price: 3750,
    originalPrice: null,
  },
];

const ProductsGrid = () => {
  const handleAddToCart = (product) => {
    console.log("Added:", product);
  };

  return (
    <section className="pb-10 ">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Responsive Grid */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
