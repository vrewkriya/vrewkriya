export type ServiceCategory = {
  title: string;
  slug: string;
  shortDesc: string;
  points: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Creative Production",
    slug: "creative-production",
    shortDesc: "High-end photography and cinematic videography.",
    points: [
      "Luxury jewellery photography (product, editorial, bridal)",
      "Cinematic videography and brand films",
      "Model based campaign shoots (bridal, fashion, lifestyle)",
      "Jewellery only premium shoots (still life, minimal, heritage)",
      "Macro and detail shots highlighting craftsmanship",
      "Set design, props, and shoot production management",
      "Location scouting (studio, heritage spaces, villas)",
    ],
  },
  {
    title: "Content and Brand Strategy",
    slug: "content-and-brand-strategy",
    shortDesc: "Strategic positioning and multi-platform planning.",
    points: [
      "Campaign ideation and storytelling concepts",
      "Brand positioning for jewellery businesses",
      "Collection launch planning",
      "Instagram content strategy and planning",
      "Reels and short form content creation",
      "Ad creative scripting and hooks",
      "Influencer and collaboration strategy",
    ],
  },
  {
    title: "Post Production and Delivery",
    slug: "post-production-and-delivery",
    shortDesc: "Exquisite retouching and visual finishing.",
    points: [
      "High end photo retouching and enhancement",
      "Jewellery shine, clarity, and detailing edits",
      "Color grading for luxury visual tone consistency",
      "Video editing and cinematic finishing",
      "Format optimization (Instagram, ads, website)",
      "Final delivery in ready to use formats",
    ],
  },
  {
    title: "Performance Marketing",
    slug: "performance-marketing",
    shortDesc: "Data-driven ad campaigns and conversion systems.",
    points: [
      "Instagram and Facebook ad campaigns",
      "Lead generation and enquiry campaigns",
      "Retargeting strategies for conversions",
      "Funnel building and automation systems",
      "WhatsApp marketing and conversion setup",
      "Campaign optimization and scaling",
    ],
  },
  {
    title: "Social Media Management",
    slug: "social-media-management",
    shortDesc: "Curated feeds and consistent community growth.",
    points: [
      "Monthly content calendars",
      "Feed design and visual consistency",
      "Daily and weekly posting strategy",
      "Engagement and growth strategy",
      "Caption and hashtag strategy",
    ],
  },
  {
    title: "New Store Launch Support",
    slug: "new-store-launch-support",
    shortDesc: "Buzz generation and comprehensive event coverage.",
    points: [
      "Pre launch teaser campaigns and hype creation",
      "Launch day photo and video coverage",
      "Influencer collaborations and store promotions",
      "Real time content creation (Reels, Stories)",
      "Post launch ad campaigns and footfall generation",
      "Customer testimonial and experience capture",
    ],
  },
  {
    title: "Google Business Profile Management",
    slug: "google-business-profile-management",
    shortDesc: "Local SEO and optimized digital storefronts.",
    points: [
      "Profile setup and optimization",
      "Keyword and category targeting",
      "Store photo and video uploads",
      "Review generation and management",
      "Weekly posts and updates",
      "Local SEO and Google Maps ranking improvement",
      "Performance tracking and reporting",
    ],
  },
  {
    title: "Exhibition and Outstation Promotion",
    slug: "exhibition-and-outstation-promotion",
    shortDesc: "Targeted city campaigns and lead capture.",
    points: [
      "City specific targeted ad campaigns",
      '"We are coming to [City]" promotional campaigns',
      "Local influencer collaborations in exhibition cities",
      "On ground content creation during events",
      "Live promotion (Reels, Stories, walkthroughs)",
      "Post event retargeting campaigns",
      "Lead capture and conversion strategy",
    ],
  },
  {
    title: "End to End Campaign Execution",
    slug: "end-to-end-campaign-execution",
    shortDesc: "Seamless execution from concept to rollout.",
    points: [
      "Concept to shoot to edit to launch to scale",
      "Festive campaigns (Ugadi, Diwali, wedding season)",
      "Collection launches and brand campaigns",
      "Offer based promotional campaigns",
      "Multi platform rollout (Instagram, Google, WhatsApp)",
    ],
  },
  {
    title: "Consulting and Growth Strategy",
    slug: "consulting-and-growth-strategy",
    shortDesc: "Market analysis and strategic scaling roadmaps.",
    points: [
      "Jewellery business positioning",
      "Market and competitor analysis",
      "Customer acquisition strategy",
      "Branding and scaling roadmap",
      "Performance analysis and optimization",
    ],
  },
];

export const serviceCategoryTitles = serviceCategories.map(({ title }) => title);
