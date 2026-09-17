export type StatCard = {
  value: string;
  label: string;
  iconPath: string;
};

export type SolutionsDeliveryData = {
  heading: string;
  paragraphs: string[];
  mainImage: string;
  mainImageEyebrow: string;
  mainImageTitle: string;
  mainImageDesc: string;
  bottomLeftImage: string;
  bottomLeftText: string;
  bottomRightImage: string;
  bottomRightText: string;
  stats: StatCard[];
};

export const deliveryData: SolutionsDeliveryData = {
  heading: "One challenge. The right combination of expertise.",
  paragraphs: [
    "Your priorities rarely sit in one technology category. A customer-experience programme may need Salesforce, integration, data and application engineering. A cloud modernisation may need security, platform expertise and managed support from day one.",
    "We bring the disciplines together around the outcome — with a delivery approach that stays focused and grows as the opportunity develops."
  ],
  mainImage: "/solutions/our-vision.webp",
  mainImageEyebrow: "OUR VISION",
  mainImageTitle: "Upscale your technology.",
  mainImageDesc: "Unlock potential. Accelerate growth. Lead what's next.",
  bottomLeftImage: "/solutions/secure.webp",
  bottomLeftText: "Secure what matters",
  bottomRightImage: "/solutions/Modernise.webp",
  bottomRightText: "Modernise with confidence",
  stats: [
    {
      value: "98%",
      label: "Client satisfaction",
      iconPath: "/solutions/bi_shield-fill-check (1).svg",
    },
    {
      value: "25+",
      label: "Industries served",
      iconPath: "/solutions/fluent_people-community-32-filled (1).svg",
    },
    {
      value: "10+",
      label: "Years of experience",
      iconPath: "/solutions/boxicons_rocket-filled (1).svg",
    }
  ]
};
