import React from "react";
import { blogs } from "../../data/blogs";
import Hookheading from "../common/Hookheading";

export default function LatestBlogs() {
  // Sort by latest date and get top 3
  const latestBlogs = [...blogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16">
        <Hookheading text1="Latest " text2="Blog Updates" />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogs.map((blog, index) => (
            <div
              key={blog.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 ${
                index === 2 ? "hidden lg:block" : ""
              }`}
            >
              <div className="relative overflow-hidden h-56 bg-gray-200">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className="absolute top-4 left-4 inline-block px-3 py-1 text-white text-xs font-bold rounded-full"
                  style={{ backgroundColor: "#003873" }}
                >
                  {blog.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">
                  {blog.date}
                </p>
                <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {blog.desc}
                </p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-semibold transition"
                    style={{ color: "#003873" }}
                    onMouseEnter={(e) => (e.target.style.color = "#002a5c")}
                    onMouseLeave={(e) => (e.target.style.color = "#003873")}
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <a
            href="/blog"
            className="inline-block px-8 py-3 text-white font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: "#003873" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#002a5c")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#003873")}
          >
            View All Blogs →
          </a>
        </div>
      </div>
    </section>
  );
}
