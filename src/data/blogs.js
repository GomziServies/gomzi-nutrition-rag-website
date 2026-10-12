// src/data/blogs.js

export const blogs = [
  {
    id: 1,
    category: "Nutrition",
    date: "August 10, 2026",

    title:
      "Whey Protein Isolate vs. Concentrate: Which One Should You Actually Choose?",

    desc: "Compare protein content, digestion, lactose, taste, and price to find the right whey for your goals.",

    image: "/images/blog-1.webp",

    slug: "whey-protein-isolate-vs-concentrate",

    metaTitle: "Whey Protein Isolate vs Concentrate - Which to Choose?",

    metaDescription:
      "Confused between whey isolate and concentrate? Compare protein content, digestion, and price to find the right one for your goals - explained simply.",

    author: "Gomzi Supplement by RAG",

    content: {
      intro: [
        "Whey protein isolate contains 90%+ protein with minimal lactose and fat, making it faster-digesting and better for lactose-sensitive users. Whey concentrate has slightly less protein (70–80%) but retains more natural nutrients and costs less. Your choice depends on your goals, budget, and digestion.",

        'If you\'ve stood in front of a supplement shelf - or scrolled through one online - you\'ve probably seen both "whey protein isolate" and "whey protein concentrate" listed side by side, often with very little explanation of what actually separates them. Here\'s a straightforward breakdown so you can pick the one that actually fits your goals, not just the one with the flashier label.',
      ],

      sections: [
        {
          heading: "What is whey protein isolate?",

          paragraphs: [
            "Whey protein isolate is whey that's gone through additional filtration to strip out most of the fat, carbohydrates, and lactose, leaving a product that's typically 90% protein or higher by weight.",

            "Because so little else is left in the mix, it digests faster and sits lighter on the stomach - which is exactly why it's the more common recommendation for anyone who's lactose-sensitive or trying to hit precise macros without extra carbs or fat sneaking in.",
          ],
        },

        {
          heading: "What is whey protein concentrate?",

          paragraphs: [
            "Whey protein concentrate goes through less processing, so it retains more of the natural components of whey - including a bit more lactose, fat, and carbohydrates. Protein content typically lands between 70–80% by weight.",

            "That might sound like a downside, but the extra processing isolate goes through isn't free - concentrate is usually more affordable, and many people find it has a richer, creamier taste since less has been filtered out.",
          ],
        },
      ],

      comparisonTable: {
        heading: "Whey Isolate vs. Concentrate - Side-by-Side Comparison",

        columns: ["Factor", "Whey Isolate", "Whey Concentrate"],

        rows: [
          ["Protein content", "90%+ per serving", "70-80% per serving"],
          [
            "Lactose content",
            "Very low - better for sensitive stomachs",
            "Moderate - more natural lactose retained",
          ],
          ["Fat & carbs", "Minimal", "Slightly higher"],
          ["Digestion speed", "Faster-absorbing", "Slightly slower"],
          ["Taste & texture", "Slightly less creamy", "Richer, creamier taste"],
          ["Price", "Generally higher", "Generally more affordable"],
          [
            "Best for",
            "Cutting phases, lactose sensitivity, precise macros",
            "Bulking, everyday use, budget-conscious buyers",
          ],
        ],
      },

      choiceSection: {
        heading: "Which one is right for you?",

        options: [
          {
            title: "Choose whey isolate if:",
            items: [
              "You're lactose-sensitive or notice bloating with regular dairy products",
              "You're in a cutting phase and tracking macros closely",
              "You want the fastest-digesting option, especially right after a workout",
            ],
          },

          {
            title: "Choose whey concentrate if:",
            items: [
              "You don't have any issues digesting dairy",
              "You're looking for a more budget-friendly everyday protein",
              "You prefer a richer, creamier taste and texture",
            ],
          },
        ],
      },

      gomziSection: {
        heading: "What Gomzi Supplement uses, and why",

        paragraphs: [
          "At Gomzi Supplement, we chose [isolate/concentrate/blend - specify] for our whey protein because [specific reasoning tied to your actual formulation choice].",

          "Each serving delivers [X]g of protein and [X]g of BCAAs, manufactured under [FSSAI/GMP/HACCP - confirm which apply] certified conditions.",
        ],
      },

      faqs: [
        {
          question: "Is whey isolate always better than concentrate?",

          answer:
            'Not necessarily - "better" depends on your goals. Isolate is the stronger choice for lactose sensitivity or strict macro tracking, but concentrate is a perfectly good, more affordable option for most people without digestive issues.',
        },

        {
          question: "Can I switch between isolate and concentrate?",

          answer:
            "Yes. Many people use concentrate for everyday use and switch to isolate during a cutting phase or if they notice digestive discomfort.",
        },

        {
          question:
            "Does whey protein isolate taste different from concentrate?",

          answer:
            "Generally, isolate has a slightly thinner texture and less creamy taste since more fat and lactose have been filtered out, while concentrate tends to taste richer.",
        },

        {
          question: "How much protein do I actually need per day?",

          answer:
            "Research from the International Society of Sports Nutrition recommends 1.4–2.0g of protein per kg of body weight per day for building and maintaining muscle mass in physically active individuals.",
        },
      ],

      bottomLine: {
        heading: "The bottom line",

        paragraphs: [
          'Both whey isolate and concentrate are effective, well-researched protein sources - neither is a "bad" choice.',

          "The right one depends on your digestion, your budget, and how closely you're tracking macros.",

          "If you're still unsure, start with concentrate for everyday use, and switch to isolate if you notice bloating or want tighter macro control.",
        ],
      },
    },
  },

  // ============================================================
  // BLOG #3
  // ============================================================

  {
    id: 3,

    category: "Nutrition",

    date: "August 10, 2026",

    title:
      "How Much Protein Do You Actually Need Per Day? An India-Specific, ICMR-Based Guide",

    desc: "Confused about daily protein needs? Here's what ICMR's official RDA actually says, how it changes if you're active, and what a dietitian recommends.",

    image: "/images/blog-2.webp",

    slug: "how-much-protein-do-you-need-per-day-india",

    metaTitle: "How Much Protein Do You Need Per Day? (India Guide)",

    metaDescription:
      "Confused about daily protein needs? Here's what ICMR's official RDA actually says, how it changes if you're active, and what a dietitian recommends.",

    primaryKeyword: "how much protein do you need per day",

    secondaryKeywords: [
      "ICMR protein RDA India",
      "protein requirement for active adults",
      "daily protein intake calculator",
    ],

    author:
      "Dt. Chirag Pandey, Registered Dietitian & Co-Founder, Gomzi Supplement",

    reviewedBy:
      "Dt. Chirag Pandey, Registered Dietitian & Co-Founder, Gomzi Supplement",

    content: {
      intro: [
        "ICMR recommends a Recommended Dietary Allowance (RDA) of 0.83g of protein per kilogram of body weight per day for a healthy, sedentary Indian adult - meaning a 60kg adult needs roughly 50g daily.",

        "If you're strength training or physically active, sports nutrition research supports 1.2-1.6g/kg, meaningfully higher than the baseline RDA.",

        "Protein requirements aren't one-size-fits-all, and most generic \"how much protein do you need\" content online quotes Western guidelines that don't reflect Indian dietary research. Here's what India's own official guidance actually says, how it changes based on your activity level, and just as important - what it doesn't recommend.",
      ],

      sections: [
        {
          heading: "What ICMR's official RDA actually says?",

          paragraphs: [
            "The Indian Council of Medical Research (ICMR), through the National Institute of Nutrition (NIN), sets India's official nutrient guidelines. The 2020 ICMR-NIN guidelines set the Estimated Average Requirement (EAR) at 0.66g/kg/day and the Recommended Dietary Allowance (RDA) at 0.83g/kg/day for a healthy, sedentary adult - meaning a 60kg adult needs approximately 50g of protein daily to meet baseline requirements.",
          ],
        },

        {
          heading: "Why active individuals typically need more?",

          paragraphs: [
            "ICMR's RDA is calculated as a minimum to prevent deficiency in a sedentary population - it isn't designed as an optimal target for someone strength training or otherwise physically active.",

            "Sports nutrition research, including the International Society of Sports Nutrition's position stand, supports higher intakes of 1.2-1.6g/kg/day for individuals engaged in regular resistance training or muscle-building goals - a meaningfully higher target than the baseline RDA.",
          ],
        },
      ],

      proteinTable: {
        heading: "Daily Protein Needs by Activity Level",

        columns: [
          "Activity Level",
          "Recommended Intake",
          "Example (60kg adult)",
        ],

        rows: [
          [
            "Sedentary adult (ICMR RDA)",
            "0.83 g/kg body weight",
            "~50g for a 60kg adult",
          ],
          [
            "Moderately active adult",
            "1.0-1.2 g/kg body weight",
            "~60-72g for a 60kg adult",
          ],
          [
            "Strength training / active",
            "1.2-1.6 g/kg body weight",
            "~72-96g for a 60kg adult",
          ],
          [
            "Adults 60+ (per ICMR-NIN)",
            "1.0-1.2 g/kg body weight",
            "Men: ~54g/day · Women: ~45.7g/day baseline",
          ],
        ],
      },

      cautionSection: {
        heading:
          "What India's dietary guidelines actually caution about supplements?",

        label: "Important, and often left out of supplement-brand content",

        paragraphs: [
          "India's 2024 ICMR-NIN Dietary Guidelines specifically caution against relying on protein powder supplements for muscle building, citing potential risks - including bone mineral loss and kidney concerns - associated with prolonged, high-dose intake of protein powders or concentrates. The guidance emphasizes meeting protein needs primarily through food, with quality protein sources like pulses, dairy, and lean meats forming the foundation of intake.",

          "We think it matters to say this plainly, even as a supplement brand: a protein powder is meant to fill a genuine gap in your daily intake - not replace whole food as your primary protein source. If you're consistently falling short of your target through food alone, a quality protein supplement can help close that gap; it isn't a substitute for a balanced diet.",
        ],
      },

      expertSection: {
        heading: "Dt. Chirag Pandey's perspective",

        quote:
          "The biggest mistake I see is people either ignoring protein entirely or over-relying on powder to hit an arbitrary number. Start with your actual food intake, identify the real gap, and use a supplement to close it - not replace it. Most people are surprised how much protein they're already getting from dal, dairy, and everyday meals once they actually track it.",

        author:
          "Dt. Chirag Pandey, Registered Dietitian & Co-Founder, Gomzi Supplement",
      },

      calculatorSection: {
        heading: "A simple way to calculate your own target",

        paragraphs: [
          "Multiply your body weight in kg by your activity-level factor from the table above.",

          "For example, a 70kg moderately active adult: 70 × 1.1 (midpoint of 1.0-1.2) ≈ 77g of protein per day.",

          "Track your actual food intake for a few days before assuming you need a large supplement dose - most people are closer to their target than they expect.",
        ],

        formula:
          "Daily protein target = Body weight (kg) × Activity-level factor",
      },

      faqs: [
        {
          question: "Is the ICMR RDA enough if I go to the gym regularly?",

          answer:
            "For most people doing regular strength training, the baseline ICMR RDA of 0.83g/kg is likely insufficient - sports nutrition research supports 1.2-1.6g/kg for this activity level.",
        },

        {
          question:
            "Can I get enough protein from an Indian vegetarian diet alone?",

          answer:
            "Yes, with planning - combining pulses, dairy, and other quality plant protein sources can meet even elevated protein targets, though it typically requires more deliberate meal planning than a mixed diet.",
        },

        {
          question: "Is it safe to take whey protein daily?",

          answer:
            "For most healthy adults, moderate daily use as part of a balanced diet is considered safe - but sustained very high intake is where caution is warranted, per the ICMR-NIN guidance above. If you have any kidney or health concerns, consult a doctor or dietitian before increasing protein intake significantly.",
        },

        {
          question: "Do older adults need more or less protein?",

          answer:
            "More, not less - ICMR-NIN guidance for adults 60+ recommends higher intake (around 54g/day for men, 45.7g/day for women, before activity adjustment) to help prevent age-related muscle loss (sarcopenia).",
        },
      ],

      bottomLine: {
        heading: "The bottom line",

        paragraphs: [
          "Most people significantly overestimate or underestimate their real protein needs because they're working from generic, non-Indian guidelines or marketing claims rather than official data.",

          "Start with ICMR's baseline RDA, adjust upward based on your real activity level, prioritize food first, and use a quality protein supplement to close genuine gaps - not as a default replacement for whole food.",
        ],
      },

      furtherReading: [
        {
          title: "ICMR-NIN Dietary Guidelines for Indians, 2024",
          url: "https://main.icmr.nic.in/sites/default/files/upload_documents/DGI_07th_May_2024_fin.pdf",
        },
        {
          title:
            "International Society of Sports Nutrition Position Stand: Protein and Exercise",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5477153/",
        },
      ],

      relatedReading: [
        {
          title:
            "Whey Protein Isolate vs. Concentrate: Which One Should You Actually Choose?",
          url: "/blog/whey-protein-isolate-vs-concentrate",
        },
        {
          title: "Our Whey Protein Isolate product page",
          url: "/gomzi-supplement/whey-protein-isolate",
        },
        {
          title: "About Dt. Chirag Pandey & the Gomzi Supplement story",
          url: "/about",
        },
      ],
    },
  },

  {
    id: 4,
    category: "Nutrition",
    date: "August 13, 2026",
    title:
      "Losing Muscle on GLP-1 Weight Loss Drugs? Here's the Protein Fix Indian Users Are Missing",
    desc: "On Ozempic or a GLP-1 weight-loss plan? Learn why muscle loss happens, how much protein you actually need, and which Gomzi Supplement protein fits your routine.",
    image: "/images/blog-3.webp",
    slug: "protein-for-glp1-weight-loss-muscle-preservation",
    metaTitle:
      "Losing Muscle on GLP-1 Weight Loss Drugs? The Protein Fix You Need | Gomzi Supplement",
    metaDescription:
      "On Ozempic or a GLP-1 weight-loss plan? Learn why muscle loss happens, how much protein you actually need, and which Gomzi Supplement protein fits your routine.",
    primaryKeyword: "protein for GLP-1 weight loss",
    secondaryKeywords: [
      "muscle loss on Ozempic",
      "high protein diet for weight loss India",
      "whey protein for weight loss",
      "preserve muscle while losing weight",
      "best protein powder India 2026",
      "semaglutide nutrition tips",
    ],

    author: "Gomzi Supplement",

    content: {
      intro: [
        "A quick note before you read on: This article shares general nutrition information, not medical advice. GLP-1 medications should only be started, adjusted, or stopped under a doctor's guidance. Speak to your physician or a registered dietitian about your specific treatment plan and protein needs.",

        "At Gomzi Supplement, we've noticed a pattern in the last year: more and more customers writing in to say they're on a GLP-1 weight-loss plan, eating far less than before, and worried they're losing muscle along with the fat. They're not imagining it.",

        "GLP-1 medications (the semaglutide class of drugs, often referred to by brand names like Ozempic or Wegovy) have become one of the most talked-about weight-management tools in India through 2025–2026. They work by suppressing appetite - which means less food overall, and for many people, that means less protein too. And when total protein intake drops while you're in a calorie deficit, your body doesn't just burn fat. It burns muscle.",

        "This guide explains why that happens, how much protein you likely need to protect your muscle while on a GLP-1 plan, and practical ways to close that gap - including where a protein supplement fits in.",
      ],

      sections: [
        {
          heading: "Why GLP-1 weight loss comes with a muscle-loss risk?",

          paragraphs: [
            "Research tracking body composition changes in people on GLP-1 medications has found that a meaningful share of total weight lost is lean mass, not just fat - in some studies, lean mass has accounted for a notable proportion of overall weight loss.",

            "This isn't unique to GLP-1 drugs; it happens with any aggressive calorie deficit. But because GLP-1 medications suppress appetite so effectively, people often eat far below their protein needs without realizing it, which accelerates the problem.",

            "Muscle isn't just about how you look. It's active tissue that supports your metabolism, blood sugar regulation, strength, and mobility - losing too much of it while losing weight can undermine the very health outcomes the weight loss was meant to achieve.",
          ],
        },

        {
          heading: "How much protein do you actually need?",

          paragraphs: [
            "General nutrition guidance for adults trying to preserve muscle during a calorie deficit typically points toward a higher protein intake than the standard baseline recommendation - closer to 1.2–1.6 grams of protein per kilogram of body weight per day for most active adults, though your exact needs depend on your weight, activity level, and medical situation.",

            "This is general information, not a personalized target - your doctor or a registered dietitian can help you calculate what's right for you.",

            "The practical challenge on a GLP-1 plan is volume: if your appetite is significantly suppressed, hitting that protein number through food alone - three eggs, a chicken breast, a bowl of dal - can be genuinely difficult when you simply don't feel hungry enough to eat that much.",
          ],
        },

        {
          heading: "Closing the protein gap without forcing extra food",

          paragraphs: [
            "Prioritize protein first at every meal - eat your protein source before anything else on the plate while your appetite allows it.",

            "Spread protein across the day in smaller amounts rather than one large meal, since appetite suppression can make big meals harder to finish.",

            "Use a protein supplement to fill the gap on days when food alone doesn't get you there - this is often the simplest lever, since a single scoop can deliver 20–25g of protein in a small volume that's easy to consume even with reduced appetite.",

            "Pair protein intake with light resistance training where possible - even 2–3 short sessions a week signals your body to preserve muscle rather than break it down.",
          ],
        },

        {
          heading: "Where a protein supplement fits in?",

          paragraphs: [
            "This is exactly the situation whey protein was built for: getting meaningful protein into your body without needing to eat a large volume of food. A scoop of Gomzi Supplement whey protein delivers a concentrated dose of protein in a small, easy-to-consume serving - useful when your appetite is suppressed but your protein needs haven't gone down.",

            "Explore our whey protein range to find a flavor and format that fits into a lower-appetite routine.",
          ],

          links: [
            {
              text: "Explore our whey protein range",
              url: "/gomzi-supplement/whey-protein",
            },
          ],
        },
      ],

      faqs: [
        {
          question: "Does whey protein interfere with GLP-1 medications?",

          answer:
            "There's no established interaction between whey protein and GLP-1 medications for most people, but you should always confirm any new supplement with your doctor, especially alongside prescription treatment.",
        },

        {
          question:
            "How much protein should I get from supplements versus food?",

          answer:
            "Whole food should still be your primary protein source where your appetite allows. A supplement is best used to close the gap on days when you fall short, not to replace meals entirely.",
        },

        {
          question: "Will protein powder affect weight loss results?",

          answer:
            "Protein itself is calorie-neutral to your weight-loss goal when accounted for in your daily intake - its role here is protecting muscle mass, not adding extra calories beyond what your plan allows.",
        },

        {
          question:
            "I'm not on a GLP-1 medication but I'm dieting - does this still apply to me?",

          answer:
            "Yes. Anyone in a sustained calorie deficit is at risk of losing muscle along with fat, and higher protein intake plus resistance training is the standard way to protect against it.",
        },
      ],

      bottomLine: {
        heading: "The bottom line",

        paragraphs: [
          "If you're on a GLP-1 weight-loss plan, the fat loss is working the way it's meant to - but muscle loss is a real, well-documented side effect that's easy to overlook when your appetite is suppressed.",

          "Prioritizing protein at every meal, and using a supplement like Gomzi Supplement whey protein to fill the gaps, is one of the simplest ways to protect the muscle you've worked to build.",
        ],
      },

      furtherReading: [
        {
          title: "ICMR-NIN Dietary Guidelines for Indians",
          url: "https://main.icmr.nic.in/",
        },

        {
          title:
            "National Institutes of Health - GLP-1 receptor agonists and body composition",
          url: "https://www.ncbi.nlm.nih.gov/",
        },

        {
          title:
            "How Much Protein Do You Actually Need Per Day? A Simple Indian Diet Guide",
          url: "/blog/how-much-protein-do-you-need-per-day-india",
        },
      ],

      relatedReading: [
        {
          title: "Whey Protein Concentrate vs Isolate: Which Should You Buy?",
          url: "/blog/whey-protein-isolate-vs-concentrate",
        },

        {
          title: "Our Whey Protein Range",
          url: "/gomzi-supplement/whey-protein",
        },
      ],

      about: {
        heading: "About Gomzi Supplement",

        paragraphs: [
          "Gomzi Supplement is a D2C supplement brand offering whey protein and sports nutrition products manufactured under GMP-certified conditions by Gomzi Lifesciences LLP, Surat.",
        ],
      },
    },
  },
  {
    id: 5,
    category: "Brand Story",
    date: "",

    title: "The Legacy of RAG: The Three Words Behind Every Gomzi Supplement",

    desc: "Discover the story behind Gomzi Supplement and the RAG philosophy - Real, Authentic, Genuine - the three values that shape every product we make.",

    image: "/images/blog-4.webp",

    slug: "gomzi-supplement-legacy-of-rag",

    metaTitle:
      "The Legacy of RAG: The Three Words Behind Every Gomzi Supplement",

    metaDescription:
      "Discover the story behind Gomzi Supplement and the RAG philosophy - Real, Authentic, Genuine - the three values that shape every product we make.",

    primaryKeyword: "Gomzi Supplement",

    secondaryKeywords: [
      "RAG philosophy",
      "Real Authentic Genuine",
      "Gomzi Supplement brand story",
      "Gomzi nutrition",
    ],

    author: "Gomzi Supplement",

    content: {
      intro: [
        "RAG is the core philosophy behind Gomzi Supplement, standing for Real, Authentic, and Genuine. This blog explains what each of these three words means in practice, why Gomzi Supplement was built around them, and how they shape every product decision we make - from sourcing to labeling.",

        "If you're evaluating whether Gomzi is a trustworthy supplement brand, this article gives you the direct answer.",
      ],

      sections: [
        {
          heading: "What Is RAG?",

          paragraphs: [
            "At Gomzi Supplement, RAG isn't just a tagline - it's a three-word standard every product must meet before it reaches you.",
          ],

          bullets: ["R - Real", "A - Authentic", "G - Genuine"],

          closingParagraph:
            "This is the Legacy of RAG: a brand built on keeping promises the supplement industry usually breaks.",
        },

        {
          heading: "R - Real",

          paragraphs: [
            "Real means ingredients that are exactly what they claim to be, formulas grounded in real nutritional science rather than trends, and results customers can actually feel.",
          ],

          bullets: [
            'No hidden fillers or vague "proprietary blends"',
            "No exaggerated before/after claims",
            "Nutrition science over marketing fashion",
          ],

          links: [
            {
              text: "Product Quality & Ingredients",
              url: "/ingredients",
            },
          ],
        },

        {
          heading: "A - Authentic",

          paragraphs: [
            "Authentic means every ingredient has a traceable, verified source, and every formulation is backed by evidence rather than invented brand mythology.",
          ],

          bullets: [
            "Verified sourcing partners",
            "Evidence-based formulation, not borrowed credibility",
            "An honest brand story - no fabricated heritage claims",
          ],

          links: [
            {
              text: "Sourcing & Supply Chain",
              url: "/ingredients",
            },
          ],
        },

        {
          heading: "G - Genuine",

          paragraphs: [
            "Genuine means what's on the label is what's in the product, communication stays honest even when overselling would be easier, and customer trust doesn't stop at checkout.",
          ],

          bullets: [
            "Transparent, accurate labeling",
            "Honest claims - no inflated promises",
            "Ongoing accountability after purchase, not just before",
          ],

          links: [
            {
              text: "Label Transparency",
              url: "/faq",
            },
          ],
        },

        {
          heading: "Why RAG Matters: The Trust Problem in Supplements",

          paragraphs: [
            'The supplement industry has a well-documented trust problem - inflated claims, unverifiable ingredient lists, and "wellness" marketing that promises results it can\'t prove. This has made consumers, regulators, and health experts increasingly cautious about unverified supplement claims.',

            "Gomzi Supplement was built as a direct answer to that skepticism. RAG isn't applied after a product is made - it's the filter every ingredient, claim, and process must pass through before a product is made at all.",
          ],
        },
      ],

      faqs: [
        {
          question: "What does RAG stand for in Gomzi Supplement?",

          answer:
            "RAG stands for Real, Authentic, and Genuine - the three core values that guide every Gomzi Supplement product, from ingredient sourcing to final labeling.",
        },

        {
          question:
            "Why did Gomzi Supplement choose RAG as its brand philosophy?",

          answer:
            "Because the supplement industry often struggles with trust - inflated claims and unclear sourcing. RAG was created as a concrete, testable standard rather than a vague marketing promise.",
        },

        {
          question:
            "How does Gomzi Supplement ensure its products are Real, Authentic, and Genuine?",

          answer:
            "Through verified ingredient sourcing, evidence-based formulation, and transparent labeling that matches exactly what's inside each product.",
        },

        {
          question: "Is Gomzi Supplement backed by scientific research?",

          answer:
            "Yes - formulations are based on established nutritional science rather than trend-driven claims. Specific certifications, lab testing, or clinical backing should be added here once confirmed.",
        },
      ],

      bottomLine: {
        heading: "The Legacy We're Building",

        paragraphs: [
          "A legacy isn't just what a brand says about itself - it's what people experience and trust enough to recommend.",

          "Every Gomzi Supplement product carries the same three commitments:",
        ],

        bullets: [
          "Real ingredients and science",
          "Authentic sourcing and formulation",
          "Genuine transparency, from label to lived experience",
        ],

        closing: "This is the Legacy of RAG. This is Gomzi.",
      },

      relatedReading: [
        {
          title: "Gomzi Supplement Product Range",
          url: "/gomzi-supplement",
        },

        {
          title: "Product Quality & Ingredients",
          url: "/ingredients",
        },

        {
          title: "About Gomzi Supplement",
          url: "/about",
        },
      ],
    },
  },
];
