import React, { useEffect, useState } from "react";
import { getBlogBySlugApi } from "../../api/blog.api";

export const resolveImageUrl = (url) => {
  if (!url) return "/images/blog-1.webp";
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:") ||
    url.startsWith("data:")
  ) {
    return url;
  }
  if (url.startsWith("/")) {
    return url;
  }
  return `https://files.fggroup.in/${url}`;
};
import { Link, Navigate, useParams } from "react-router-dom";

import SEO from "../../component/SEO";
import { blogs } from "../../data/blogs";
import { formatBlogTables } from "../../utils/blogTableFormatter";

const BlogDetail = () => {
  const { slug } = useParams();
  const staticFallback = blogs.find((item) => item.slug === slug);
  const [blog, setBlog] = useState(staticFallback || null);
  const [loading, setLoading] = useState(!staticFallback);

  const rawHtml = blog?.content?.html;
  const hasRichHtml = Boolean(
    rawHtml &&
      typeof rawHtml === "string" &&
      (rawHtml.replace(/<p><br\s*\/?><\/p>/gi, "").replace(/<[^>]*>/g, "").trim().length > 0 ||
        /<img|<table|<iframe|<figure/i.test(rawHtml))
  );

  const processedHtml = React.useMemo(() => {
    if (!hasRichHtml || !rawHtml) return "";
    return rawHtml.replace(
      /<img([^>]+)src=["']([^"']+)["']([^>]*)>/gi,
      (match, prefix, src, suffix) => {
        const resolved = resolveImageUrl(src);
        return `<img${prefix}src="${resolved}"${suffix}>`;
      }
    );
  }, [hasRichHtml, rawHtml]);

  // Extract FAQs and ensure no duplicate unstyled FAQ heading exists in body HTML
  const { effectiveFaqs, displayHtml } = React.useMemo(() => {
    let faqs = Array.isArray(blog?.content?.faqs) && blog.content.faqs.length > 0 ? [...blog.content.faqs] : [];
    let cleanedHtml = processedHtml || "";

    if (cleanedHtml) {
      // Matches any H1-H6 heading containing "Frequently Asked Questions" or "FAQs" even when wrapped in spans/styles
      const faqHeadingRegex = /<h([1-6])[^>]*>(?:(?!<\/h\1>)[\s\S])*?(?:Frequently\s+Asked\s+Questions|FAQs?)(?:(?!<\/h\1>)[\s\S])*?<\/h\1>/i;
      const match = faqHeadingRegex.exec(cleanedHtml);

      if (match) {
        const startIndex = match.index;
        const afterHeading = cleanedHtml.slice(startIndex + match[0].length);
        // Find next major section heading (h1 or h2) that terminates the FAQ section
        const nextSectionMatch = /<h[12][^>]*>/i.exec(afterHeading);
        const endIndex = nextSectionMatch ? startIndex + match[0].length + nextSectionMatch.index : cleanedHtml.length;
        const faqChunk = cleanedHtml.slice(startIndex + match[0].length, endIndex);

        // If blog.content.faqs was empty, dynamically extract Q&As from the HTML chunk
        if (faqs.length === 0) {
          const pMatches = faqChunk.match(/<p[\s\S]*?<\/p>/gi) || [];
          let currentQ = null;
          let currentA = [];

          pMatches.forEach((p) => {
            const text = p.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
            if (!text) return;

            const isQuestion =
              /^\s*\d+[\.\)]\s+.*\?$/.test(text) ||
              (text.endsWith("?") &&
                (p.includes("font-weight:700") ||
                  p.includes("font-weight: 700") ||
                  p.includes("font-weight:bold") ||
                  p.includes("font-weight: bold") ||
                  /<strong|<b\b/i.test(p) ||
                  text.length < 150));

            if (isQuestion) {
              if (currentQ && currentA.length > 0) {
                faqs.push({ question: currentQ, answer: currentA.join("\n\n") });
              }
              currentQ = text.replace(/^\s*\d+[\.\)]\s*/, "");
              currentA = [];
            } else if (currentQ) {
              currentA.push(text);
            }
          });

          if (currentQ && currentA.length > 0) {
            faqs.push({ question: currentQ, answer: currentA.join("\n\n") });
          }
        }

        // Remove the raw unstyled FAQ section from the article body HTML so it only renders in the styled accordion
        cleanedHtml = cleanedHtml.slice(0, startIndex) + cleanedHtml.slice(endIndex);
      }
    }

    if (cleanedHtml) {
      // Format tables into responsive comparison cards matching the Gomzi brand table UI
      cleanedHtml = formatBlogTables(cleanedHtml);
    }

    return { effectiveFaqs: faqs, displayHtml: cleanedHtml };
  }, [processedHtml, blog?.content?.faqs]);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      getBlogBySlugApi(slug)
        .then((res) => {
          const apiBlog = res?.data?.data?.blog || res?.data?.blog;
          if (isMounted && apiBlog) {
            setBlog(apiBlog);
          }
        })
        .catch((err) => {
          console.warn("Could not fetch live blog from API:", err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!blog && !loading) {
    return <Navigate to="/blog" replace />;
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
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
          <div className="site-container">
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
            <h1 className="max-w-5xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-tomato font-bold leading-[1.05] text-gray-900">
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
          <div className="site-container">
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
            {/* Document Content: Rich Google Docs HTML or Fallback Sections */}
            {hasRichHtml ? (
              <div
                className="blog-rich-document text-gray-800 font-modelica mb-12"
                dangerouslySetInnerHTML={{ __html: displayHtml }}
              />
            ) : (
              <>
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
            {blog.content?.sections?.map((section, index) => {
              const renderSectionImage = () => {
                if (!section.image) return null;
                const rawUrl = typeof section.image === "string" ? section.image : section.image.url;
                if (!rawUrl) return null;
                const imageUrl = resolveImageUrl(rawUrl);
                const imageAlt =
                  (typeof section.image === "object" && section.image.alt) ||
                  section.heading ||
                  "Article illustration";
                const imageCaption = typeof section.image === "object" ? section.image.caption : null;

                return (
                  <figure className="my-8 overflow-hidden rounded-2xl md:rounded-3xl bg-white border border-border shadow-sm">
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="w-full h-auto object-cover max-h-[520px]"
                      loading="lazy"
                    />
                    {imageCaption && (
                      <figcaption className="px-5 py-3 text-xs md:text-sm text-stone-500 text-center bg-stone-50 border-t border-border font-modelica">
                        {imageCaption}
                      </figcaption>
                    )}
                  </figure>
                );
              };

              const placement =
                typeof section.image === "object" && section.image.placement
                  ? section.image.placement
                  : "below_paragraphs";

              return (
                <section key={index} className="mt-12">
                  <ArticleHeading>{section.heading}</ArticleHeading>

                  {/* Top Placement Section Image */}
                  {placement === "below_heading" && renderSectionImage()}

                  {/* Paragraphs */}
                  {section.paragraphs?.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="mt-5 text-base md:text-lg leading-8 text-gray-700 font-modelica"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Middle Placement Section Image */}
                  {placement === "below_paragraphs" && renderSectionImage()}

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

                  {/* Bottom Placement Section Image */}
                  {placement === "below_bullets" && renderSectionImage()}

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
              );
            })}
              </>
            )}

            {/* Protein Table */}
            {blog.content?.proteinTable && (
              <ProteinTable table={blog.content.proteinTable} />
            )}

            {/* Comparison Table */}
            {blog.content?.comparisonTable && (
              <ComparisonTable table={blog.content.comparisonTable} />
            )}

            {/* Dynamic Tables from Admin Content */}
            {Array.isArray(blog.content?.tables) &&
              blog.content.tables.map((table, tIdx) => (
                <ProteinTable key={tIdx} table={table} />
              ))}

            {/* Choice Section (Legacy Fallback) */}
            {!hasRichHtml && blog.content?.choiceSection && (
              <ChoiceSection section={blog.content.choiceSection} />
            )}

            {/* Caution (Legacy Fallback) */}
            {!hasRichHtml && blog.content?.cautionSection && (
              <CautionSection section={blog.content.cautionSection} />
            )}

            {/* Expert (Legacy Fallback) */}
            {!hasRichHtml && blog.content?.expertSection && (
              <ExpertSection section={blog.content.expertSection} />
            )}

            {/* Calculator (Legacy Fallback) */}
            {!hasRichHtml && blog.content?.calculatorSection && (
              <CalculatorSection section={blog.content.calculatorSection} />
            )}

            {/* Gomzi (Legacy Fallback) */}
            {!hasRichHtml && blog.content?.gomziSection && (
              <GomziSection section={blog.content.gomziSection} />
            )}

            {/* FAQs */}
            {effectiveFaqs?.length > 0 && (
              <FaqSection faqs={effectiveFaqs} />
            )}

            {/* Bottom Line (Legacy Fallback) */}
            {!hasRichHtml && blog.content?.bottomLine && (
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
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-xl
                  bg-primary
                  text-white
                  font-modelica
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                ← Back to Blog
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
  if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows)) return null;

  return (
    <section className="mt-12 sm:mt-14">
      {table.heading && <ArticleHeading>{table.heading}</ArticleHeading>}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#ebdcd2] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.025)]">
        <table className="w-full min-w-[650px] border-collapse font-modelica">
          <thead>
            <tr className="bg-[#8A3822] text-white">
              {table.columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left px-6 py-4.5 text-[15px] sm:text-base font-semibold text-white tracking-wide border-none select-none"
                  style={{ backgroundColor: "#8A3822" }}
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
                className="border-b border-[#ebdcd2] last:border-b-0 hover:bg-[#faf7f3] transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`
                      px-6
                      py-4.5
                      text-[15px]
                      sm:text-base
                      leading-relaxed
                      align-top
                      border-none
                      ${
                        cellIndex === 0
                          ? "font-bold text-[#111827]"
                          : "text-[#4b5563]"
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
  if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows)) return null;

  return (
    <section className="mt-12 sm:mt-14">
      {table.heading && <ArticleHeading>{table.heading}</ArticleHeading>}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#ebdcd2] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.025)]">
        <table className="w-full min-w-[650px] border-collapse font-modelica">
          <thead>
            <tr className="bg-[#8A3822] text-white">
              {table.columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left px-6 py-4.5 text-[15px] sm:text-base font-semibold text-white tracking-wide border-none select-none"
                  style={{ backgroundColor: "#8A3822" }}
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
                className="border-b border-[#ebdcd2] last:border-b-0 hover:bg-[#faf7f3] transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`
                      px-6
                      py-4.5
                      text-[15px]
                      sm:text-base
                      leading-relaxed
                      align-top
                      border-none
                      ${
                        cellIndex === 0
                          ? "font-bold text-[#111827]"
                          : "text-[#4b5563]"
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
            className="rounded-2xl bg-white border border-border p-6"
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

      <div className="relative mt-6 rounded-2xl bg-white border border-border p-6 md:p-8">
        <div className="absolute top-5 left-6 text-6xl font-tomato text-primary/10">
          “
        </div>

        <blockquote className="relative pt-5 font-modelica text-lg md:text-xl leading-8 text-gray-700 italic">
          &ldquo;{section.quote}&rdquo;
        </blockquote>

        <div className="mt-6 pt-5 border-t border-border">
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
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-14 sm:mt-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-tomato font-bold text-gray-900 leading-tight mb-6 sm:mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-2xl bg-white border border-[#ebdcd2] shadow-[0_2px_8px_rgba(0,0,0,0.025)] hover:border-primary/40 transition-all duration-200 overflow-hidden"
          >
            <summary className="list-none cursor-pointer px-6 py-4 sm:py-5 flex items-center justify-between gap-4 font-tomato font-semibold text-base sm:text-[17px] text-gray-900 select-none [&::-webkit-details-marker]:hidden">
              <span className="leading-snug">{faq.question}</span>

              <span className="flex-shrink-0 text-primary text-xl sm:text-2xl font-bold font-mono transition-transform duration-300 group-open:rotate-45 leading-none select-none">
                +
              </span>
            </summary>

            <div className="px-6 pb-5 pt-1 border-t border-gray-100/90 mt-1">
              <p className="font-modelica text-gray-600 text-[15px] sm:text-base leading-relaxed">
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

      <div className="mt-6 rounded-2xl bg-white border border-border p-6 md:p-8">
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
          <div className="mt-7 pt-6 border-t border-border">
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
    <section className="mt-14 pt-8 border-t border-border">
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
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-sm transition"
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
              className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-sm transition"
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
    <section className="mt-14 pt-8 border-t border-border">
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
                  border-border
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
                border-border
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
