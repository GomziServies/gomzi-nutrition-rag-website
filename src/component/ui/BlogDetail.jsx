import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import SEO from "../../component/SEO";
import { blogs as staticBlogs } from "../../data/blogs";
import { getBlogBySlugApi } from "../../api/blog.api";

const resolveImageUrl = (img) => {
  if (!img) return "/images/blog-1.webp";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

const BlogDetail = () => {
  const { slug } = useParams();
  const initialBlog = staticBlogs.find((item) => item.slug === slug) || null;
  const [blog, setBlog] = useState(initialBlog);
  const [loading, setLoading] = useState(!initialBlog);

  useEffect(() => {
    let isMounted = true;
    const fetchBlog = async () => {
      try {
        const res = await getBlogBySlugApi(slug);
        if (isMounted && res.data?.data?.blog) {
          setBlog(res.data.data.blog);
        }
      } catch (err) {
        console.warn("Failed to fetch live article by slug:", err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBlog();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading && !blog) {
    return (
      <div className="min-h-screen bg-[#faf8f6] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#5C3124] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <SEO
        title={blog.metaTitle || `${blog.title} | Gomzi Supplement`}
        description={blog.metaDescription || blog.desc}
      />

      <article className="bg-light min-h-screen">
        {/* ==================================================
            HEADER
        ================================================== */}
        <section className="pt-10 md:pt-16 pb-8">
          <div className="max-w-[var(--container-width)] mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-modelica text-gray-400 mb-7 overflow-hidden">
              <Link
                to="/"
                className="hover:text-primary transition-colors flex-shrink-0"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                to="/blog"
                className="hover:text-primary transition-colors flex-shrink-0"
              >
                Blog
              </Link>

              <span>/</span>

              <span className="text-gray-600 truncate">{blog.title}</span>
            </div>

            {/* Category */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-modelica font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />

                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-tomato font-bold leading-[1.05] text-gray-900">
              {blog.title}
            </h1>

            {/* Author */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 font-modelica">
              {blog.reviewedBy ? (
                <span>Reviewed by {blog.reviewedBy}</span>
              ) : (
                <span>By {blog.author}</span>
              )}

              {blog.date && (
                <>
                  <span>•</span>
                  <span>{blog.date}</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ==================================================
            FEATURE IMAGE
        ================================================== */}
        <section className="pb-10 md:pb-14">
          <div className="max-w-[var(--container-width)] mx-auto px-4">
            <div className="overflow-hidden rounded-2xl md:rounded-3xl bg-white">
              <img
                src={resolveImageUrl(blog.image)}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* ==================================================
            ARTICLE
        ================================================== */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto px-4">
            {/* Intro */}
            <div className="space-y-5">
              {blog.content?.intro?.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl leading-8 text-gray-700 font-modelica"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Standard Sections */}
            {/* Standard Sections */}
            {blog.content?.sections?.map((section, index) => (
              <section key={index} className="mt-12">
                <ArticleHeading>{section.heading}</ArticleHeading>

                {/* Paragraphs */}
                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="mt-5 text-base md:text-lg leading-8 text-gray-700 font-modelica"
                  >
                    {paragraph}
                  </p>
                ))}

                {/* Bullet Points */}
                {section.bullets?.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-3 text-base md:text-lg leading-8 text-gray-700 font-modelica"
                      >
                        <span className="mt-3 w-2 h-2 rounded-full bg-primary flex-shrink-0" />

                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Closing Paragraph */}
                {section.closingParagraph && (
                  <p className="mt-6 text-base md:text-lg leading-8 text-gray-700 font-modelica">
                    {section.closingParagraph}
                  </p>
                )}

                {/* Internal Links */}
                {section.links?.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.url}
                        className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-primary/5
              border
              border-primary/10
              text-primary
              text-sm
              font-modelica
              font-semibold
              hover:bg-primary
              hover:text-white
              transition
            "
                      >
                        {link.text}
                        <span>→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Protein Table */}
            {blog.content?.proteinTable && (
              <ProteinTable table={blog.content.proteinTable} />
            )}

            {/* Comparison Table */}
            {blog.content?.comparisonTable && (
              <ComparisonTable table={blog.content.comparisonTable} />
            )}

            {/* Choice Section */}
            {blog.content?.choiceSection && (
              <ChoiceSection section={blog.content.choiceSection} />
            )}

            {/* Caution */}
            {blog.content?.cautionSection && (
              <CautionSection section={blog.content.cautionSection} />
            )}

            {/* Expert */}
            {blog.content?.expertSection && (
              <ExpertSection section={blog.content.expertSection} />
            )}

            {/* Calculator */}
            {blog.content?.calculatorSection && (
              <CalculatorSection section={blog.content.calculatorSection} />
            )}

            {/* Gomzi */}
            {blog.content?.gomziSection && (
              <GomziSection section={blog.content.gomziSection} />
            )}

            {/* FAQs */}
            {blog.content?.faqs?.length > 0 && (
              <FaqSection faqs={blog.content.faqs} />
            )}

            {/* Bottom Line */}
            {blog.content?.bottomLine && (
              <BottomLine section={blog.content.bottomLine} />
            )}
            {/* Further Reading */}
            {blog.content?.furtherReading?.length > 0 && (
              <FurtherReading items={blog.content.furtherReading} />
            )}

            {/* Sources */}
            {blog.content?.sources?.length > 0 && (
              <Sources sources={blog.content.sources} />
            )}

            {/* Related */}
            {blog.content?.relatedReading?.length > 0 && (
              <RelatedReading items={blog.content.relatedReading} />
            )}

            {/* Back */}
            <div className="mt-14 flex justify-center">
              <Link
                to="/blog"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 text-white font-toma font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 cursor-pointer"
              >
                <span className="relative z-10">← Back to Blog</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

/* ============================================================
   COMPONENTS
============================================================ */

const ArticleHeading = ({ children }) => {
  return (
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-tomato font-bold leading-tight text-gray-900">
      {children}
    </h2>
  );
};

/* ============================================================
   PROTEIN TABLE
============================================================ */

const ProteinTable = ({ table }) => {
  return (
    <section className="mt-14">
      <ArticleHeading>{table.heading}</ArticleHeading>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[700px] border-collapse font-modelica">
          <thead>
            <tr className="bg-primary text-white">
              {table.columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left px-5 py-4 text-sm font-semibold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`
                          px-5
                          py-4
                          text-sm
                          md:text-base
                          align-top
                          ${
                            cellIndex === 0
                              ? "font-semibold text-gray-900"
                              : "text-gray-600"
                          }
                        `}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/* ============================================================
   COMPARISON TABLE
============================================================ */

const ComparisonTable = ({ table }) => {
  return (
    <section className="mt-14">
      <ArticleHeading>{table.heading}</ArticleHeading>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[680px] border-collapse font-modelica">
          <thead>
            <tr className="bg-primary text-white">
              {table.columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left px-5 py-4 text-sm font-semibold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-200 last:border-b-0"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`
                          px-5
                          py-4
                          text-sm
                          md:text-base
                          align-top
                          ${
                            cellIndex === 0
                              ? "font-semibold text-gray-900"
                              : "text-gray-600"
                          }
                        `}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/* ============================================================
   CHOICE SECTION
============================================================ */

const ChoiceSection = ({ section }) => {
  return (
    <section className="mt-14">
      <ArticleHeading>{section.heading}</ArticleHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {section.options.map((option, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white border border-gray-200 p-6"
          >
            <h3 className="font-tomato text-xl font-bold text-primary">
              {option.title}
            </h3>

            <ul className="mt-5 space-y-3">
              {option.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-start gap-3 font-modelica text-gray-600 leading-7"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ============================================================
   CAUTION
============================================================ */

const CautionSection = ({ section }) => {
  return (
    <section className="mt-14">
      <ArticleHeading>{section.heading}</ArticleHeading>

      <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/10 p-6 md:p-8">
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">
            !
          </span>

          <div>
            <h3 className="font-modelica font-semibold text-gray-900">
              {section.label}
            </h3>

            <div className="mt-4 space-y-5">
              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-modelica text-gray-700 leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   EXPERT
============================================================ */

const ExpertSection = ({ section }) => {
  return (
    <section className="mt-14">
      <ArticleHeading>{section.heading}</ArticleHeading>

      <div className="relative mt-6 rounded-2xl bg-white border border-gray-200 p-6 md:p-8">
        <div className="absolute top-5 left-6 text-6xl font-tomato text-primary/10">
          “
        </div>

        <blockquote className="relative pt-5 font-modelica text-lg md:text-xl leading-8 text-gray-700 italic">
          "{section.quote}"
        </blockquote>

        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="font-modelica text-sm font-semibold text-gray-900">
            - {section.author}
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   CALCULATOR
============================================================ */

const CalculatorSection = ({ section }) => {
  return (
    <section className="mt-14">
      <ArticleHeading>{section.heading}</ArticleHeading>

      <div className="mt-6">
        {section.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="mt-5 text-base md:text-lg leading-8 text-gray-700 font-modelica"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-7 rounded-2xl bg-gray-900 text-white p-6 md:p-8">
        <p className="font-modelica text-xs uppercase tracking-[0.15em] text-white/50">
          Simple formula
        </p>

        <p className="mt-3 font-modelica text-lg md:text-xl font-semibold">
          {section.formula}
        </p>
      </div>
    </section>
  );
};

/* ============================================================
   GOMZI
============================================================ */

const GomziSection = ({ section }) => {
  return (
    <section className="mt-14">
      <ArticleHeading>{section.heading}</ArticleHeading>

      <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/10 p-6 md:p-8">
        {section.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="mt-4 first:mt-0 font-modelica text-gray-700 leading-8"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

/* ============================================================
   FAQ
============================================================ */

const FaqSection = ({ faqs }) => {
  return (
    <section className="mt-14">
      <ArticleHeading>Frequently Asked Questions</ArticleHeading>

      <div className="mt-6 space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-2xl bg-white border border-gray-200 overflow-hidden"
          >
            <summary className="list-none cursor-pointer px-5 md:px-6 py-5 flex items-center justify-between gap-5 font-modelica font-semibold text-gray-900">
              <span>{faq.question}</span>

              <span className="flex-shrink-0 text-primary text-xl transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>

            <div className="px-5 md:px-6 pb-5">
              <p className="font-modelica text-gray-600 leading-7">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

/* ============================================================
   BOTTOM LINE
============================================================ */

const BottomLine = ({ section }) => {
  return (
    <section className="mt-14">
      <ArticleHeading>{section.heading}</ArticleHeading>

      <div className="mt-6 rounded-2xl bg-white border border-gray-200 p-6 md:p-8">
        {/* Paragraphs */}
        {section.paragraphs?.map((paragraph, index) => (
          <p
            key={index}
            className="mt-4 first:mt-0 font-modelica text-gray-700 leading-8"
          >
            {paragraph}
          </p>
        ))}

        {/* Bullet Points */}
        {section.bullets?.length > 0 && (
          <ul className="mt-6 space-y-3">
            {section.bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-3 font-modelica text-gray-700 leading-8"
              >
                <span className="mt-3 w-2 h-2 rounded-full bg-primary flex-shrink-0" />

                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Closing */}
        {section.closing && (
          <div className="mt-7 pt-6 border-t border-gray-100">
            <p className="font-tomato text-xl md:text-2xl font-bold text-primary">
              {section.closing}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

/* ============================================================
   SOURCES
============================================================ */

const Sources = ({ sources }) => {
  return (
    <section className="mt-14 pt-8 border-t border-gray-200">
      <ArticleHeading>Further Reading & Sources</ArticleHeading>

      <div className="mt-5 space-y-3">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 font-modelica text-sm md:text-base text-primary hover:underline"
          >
            <span>•</span>

            <span>{source.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

/* ============================================================
   RELATED READING
============================================================ */

const RelatedReading = ({ items }) => {
  return (
    <section className="mt-12">
      <h3 className="font-tomato text-2xl md:text-3xl font-bold text-gray-900">
        Related Reading
      </h3>

      <div className="mt-5 grid grid-cols-1 gap-3">
        {items.map((item, index) => {
          const isInternal = item.url.startsWith("/");

          if (isInternal) {
            return (
              <Link
                key={index}
                to={item.url}
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-primary/30 hover:shadow-sm transition"
              >
                <span className="font-modelica text-sm md:text-base text-gray-700">
                  {item.title}
                </span>

                <span className="text-primary">→</span>
              </Link>
            );
          }

          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-primary/30 hover:shadow-sm transition"
            >
              <span className="font-modelica text-sm md:text-base text-gray-700">
                {item.title}
              </span>

              <span className="text-primary">→</span>
            </a>
          );
        })}
      </div>
    </section>
  );
};

/* ============================================================
   FURTHER READING
============================================================ */

const FurtherReading = ({ items }) => {
  return (
    <section className="mt-14 pt-8 border-t border-gray-200">
      <ArticleHeading>Further Reading</ArticleHeading>

      <div className="mt-5 space-y-3">
        {items.map((item, index) => {
          const isInternal = item.url?.startsWith("/");

          if (isInternal) {
            return (
              <Link
                key={index}
                to={item.url}
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  p-4
                  rounded-xl
                  bg-white
                  border
                  border-gray-200
                  hover:border-primary/30
                  hover:shadow-sm
                  transition
                "
              >
                <span className="font-modelica text-sm md:text-base text-gray-700">
                  {item.title}
                </span>

                <span className="text-primary flex-shrink-0">→</span>
              </Link>
            );
          }

          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                justify-between
                gap-4
                p-4
                rounded-xl
                bg-white
                border
                border-gray-200
                hover:border-primary/30
                hover:shadow-sm
                transition
              "
            >
              <span className="font-modelica text-sm md:text-base text-gray-700">
                {item.title}
              </span>

              <span className="text-primary flex-shrink-0">↗</span>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default BlogDetail;
