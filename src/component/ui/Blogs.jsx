import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../data/blogs";

const BlogSection = () => {
  return (
    <section className="bg-light py-12 sm:py-14 md:py-16">
      <div className="max-w-[var(--container-width)] mx-auto px-4">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-[2px] bg-primary" />

            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              The Gomzi Journal
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-none text-gray-900">
                Nutrition & Wellness
              </h2>

              <p className="mt-3 max-w-xl text-sm text-gray-500 leading-6">
                Useful insights on nutrition, fitness and everyday wellness.
              </p>
            </div>

            <span className="hidden sm:block text-xs text-gray-400">
              Latest articles
            </span>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="group block"
            >
              <article
                className="
                  h-full
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  border
                  border-gray-100
                  shadow-[0_5px_25px_rgba(0,0,0,0.045)]
                  transition-all
                  duration-400
                  hover:-translate-y-1
                  hover:shadow-[0_12px_35px_rgba(0,0,0,0.09)]
                "
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-white">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.03]
                    "
                  />

                  {/* Category */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-1.5
                        rounded-full
                        bg-white/95
                        backdrop-blur-sm
                        text-primary
                       
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        shadow-sm
                      "
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Meta */}
                  <div className="flex items-center gap-2 mb-3">
                    {blog.date && (
                      <>
                        <span className="text-[10px] uppercase tracking-[0.1em] text-gray-400">
                          {blog.date}
                        </span>

                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                      </>
                    )}

                    <span className="text-[10px] uppercase tracking-[0.1em] text-gray-400">
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="
                     
                      text-xl
                      md:text-[22px]
                      font-bold
                      leading-[1.15]
                      text-gray-900
                      line-clamp-3
                      transition-colors
                      duration-300
                      group-hover:text-primary
                    "
                  >
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-3
                     
                      text-sm
                      leading-6
                      text-gray-500
                      line-clamp-2
                    "
                  >
                    {blog.desc}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-800">
                      Read article
                    </span>

                    <span
                      className="
                        flex
                        items-center
                        justify-center
                        w-9
                        h-9
                        rounded-full
                        bg-primary
                        text-white
                        text-base
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
